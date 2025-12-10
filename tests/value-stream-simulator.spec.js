import { test, expect } from '@playwright/test'

// ============================================================================
// Test Helpers and Page Object Pattern
// ============================================================================

class SimulatorPage {
  constructor(page) {
    this.page = page
  }

  // Navigation
  async goto() {
    await this.page.goto('http://localhost:5173/')
    await this.page.waitForLoadState('networkidle')
  }

  // Header Controls
  async clickPlayButton() {
    await this.page.getByRole('button', { name: /start flow|pause/i }).click()
  }

  async clickResetButton() {
    await this.page.getByRole('button', { name: /reset simulation/i }).click()
  }

  async isSimulationPlaying() {
    const button = this.page.getByRole('button', { name: /start flow|pause/i })
    const text = await button.textContent()
    return text?.toLowerCase().includes('pause') || false
  }

  async getTick() {
    const tickText = await this.page.getByTestId('tick-counter').textContent()
    return parseInt(tickText?.replace(/[^\d]/g, '') || '0')
  }

  // Sidebar Controls
  async setArrivalRate(value) {
    const slider = this.page.locator('input[type="range"]').first()
    await slider.fill(value.toString())
  }

  async getArrivalRate() {
    const display = this.page.locator('text=/\\d+ \\/ wk/')
    const text = await display.textContent()
    return parseInt(text?.match(/\d+/)?.[0] || '0')
  }

  async setSimSpeed(value) {
    const slider = this.page.locator('input[type="range"]').nth(1)
    await slider.fill((510 - value).toString())
  }

  async clickInjectDefect() {
    await this.page.getByRole('button', { name: /inject production defect/i }).click()
  }

  // Metrics
  async getMetric(label) {
    const testId = `metric-${label.toLowerCase().replace(/\s+/g, '-')}`
    const metric = this.page.getByTestId(testId)
    const value = await metric.locator('.text-xl, .text-2xl').textContent()
    return value?.trim() || ''
  }

  async waitForMetricChange(label, initialValue, timeout = 5000) {
    const testId = `metric-${label.toLowerCase().replace(/\s+/g, '-')}`
    await this.page.waitForFunction(
      ({ testId, initial }) => {
        const metric = document.querySelector(`[data-testid="${testId}"]`)
        if (!metric) return false
        const valueEl = metric.querySelector('.text-xl, .text-2xl')
        return valueEl && valueEl.textContent !== initial
      },
      { testId, initial: initialValue },
      { timeout }
    )
  }

  // Step Management
  async getStepByName(stepName) {
    return this.page.locator(`div.relative.w-72:has-text("${stepName}")`)
  }

  async getStepByIndex(index) {
    return this.page.locator(`div.relative.w-72`).nth(index)
  }

  async openStepConfig(stepName) {
    const step = await this.getStepByName(stepName)
    await step.locator('button:has(svg)').first().click()
    await this.page.waitForTimeout(300) // Wait for config menu animation
  }

  async openStepConfigByIndex(index) {
    const step = await this.getStepByIndex(index)
    await step.locator('button:has(svg)').first().click()
    await this.page.waitForTimeout(300)
  }

  async clickStepConfigButton(buttonText) {
    // Get the visible config menu (there should only be one open at a time)
    const configMenu = this.page.locator('.absolute.z-10:visible').last()
    await configMenu.getByRole('button', { name: buttonText }).click()
  }

  async setStepField(fieldLabel, value) {
    const configMenu = this.page.locator('.absolute.z-10').last()
    // Use exact match with getByText to avoid partial matches
    const label = configMenu.getByText(fieldLabel, { exact: true })
    const input = label.locator('..').locator('input')
    await input.fill(value)
  }

  async getStepField(fieldLabel) {
    const configMenu = this.page.locator('.absolute.z-10').last()
    const label = configMenu.getByText(fieldLabel, { exact: true })
    const input = label.locator('..').locator('input')
    return await input.inputValue()
  }

  async countSteps() {
    return await this.page.locator('div.relative.w-72').count()
  }

  async isStepVisible(stepName) {
    return await this.page.locator(`text=/${stepName}/i`).isVisible()
  }

  // Work Items
  async countItemsInQueue(stepName) {
    const step = await this.getStepByName(stepName)
    const queueSection = step.locator('div.bg-slate-50\\/50, div[class*="bg-slate-50"]').first()
    // Count only ItemCard divs, not open slots (which have different text)
    const items = await queueSection.locator('div.p-2.rounded-md.border').count()
    return items
  }

  async countItemsInProcess(stepName) {
    const step = await this.getStepByName(stepName)
    const processSection = step.locator('div.bg-white').last()
    // Count only ItemCard divs (have p-2 class), exclude open slots
    const items = await processSection.locator('div.p-2.rounded-md.border').count()
    return items
  }

  async countCompletedItems() {
    const completedBin = this.page.getByTestId('completed-items-container')
    const items = await completedBin.locator('div.p-2.rounded-md.border').count()
    return items
  }

  async hasBottleneckIndicator(stepName) {
    const step = await this.getStepByName(stepName)
    const indicator = step.locator('svg.text-red-500.animate-pulse')
    return await indicator.isVisible().catch(() => false)
  }

  // Waiting utilities
  async waitForItemsToFlow(minCompletedItems = 1, timeout = 30000) {
    await this.page.waitForFunction(
      (min) => {
        const completedBin = document.querySelector('[data-testid="completed-items-container"]')
        if (!completedBin) return false
        const items = completedBin.querySelectorAll('div.p-2.rounded-md.border')
        return items.length >= min
      },
      minCompletedItems,
      { timeout }
    )
  }

  async waitForTick(minTick, timeout = 10000) {
    await this.page.waitForFunction(
      (min) => {
        const tickElement = document.querySelector('[data-testid="tick-counter"]')
        const tick = parseInt(tickElement?.textContent?.replace(/[^\d]/g, '') || '0')
        return tick >= min
      },
      minTick,
      { timeout }
    )
  }
}

// ============================================================================
// Test Suite
// ============================================================================

test.beforeEach(async ({ page }) => {
  const simulator = new SimulatorPage(page)
  await simulator.goto()
})

test.describe('Simulation Controls', () => {
  test('should start and pause simulation', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Initially not playing
    expect(await simulator.isSimulationPlaying()).toBe(false)

    // Click play
    await simulator.clickPlayButton()
    expect(await simulator.isSimulationPlaying()).toBe(true)

    // Wait for tick to advance
    await simulator.waitForTick(1)
    const tick1 = await simulator.getTick()
    expect(tick1).toBeGreaterThan(0)

    // Click pause
    await simulator.clickPlayButton()
    expect(await simulator.isSimulationPlaying()).toBe(false)

    // Verify tick stops advancing
    const tick2 = await simulator.getTick()
    await page.waitForTimeout(500)
    const tick3 = await simulator.getTick()
    expect(tick3).toBe(tick2)
  })

  test('should reset simulation to initial state', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Start simulation and let it run
    await simulator.clickPlayButton()
    await simulator.waitForTick(10)

    // Reset
    await simulator.clickResetButton()

    // Verify reset
    expect(await simulator.getTick()).toBe(0)
    expect(await simulator.isSimulationPlaying()).toBe(false)
    expect(await simulator.countCompletedItems()).toBe(0)
  })

  test('should adjust arrival rate', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    const initialRate = await simulator.getArrivalRate()
    expect(initialRate).toBe(3) // Default

    await simulator.setArrivalRate(7)
    const newRate = await simulator.getArrivalRate()
    expect(newRate).toBe(7)
  })

  test('should adjust simulation speed', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Set to fastest speed
    await simulator.setSimSpeed(10)
    await simulator.clickPlayButton()

    // Measure time to advance 5 ticks
    const startTime = Date.now()
    await simulator.waitForTick(5)
    const duration = Date.now() - startTime

    // At speed 10ms/tick, should take ~50ms (with some tolerance)
    expect(duration).toBeLessThan(500)
  })
})

test.describe('Work Item Flow', () => {
  test('should create and flow work items through pipeline', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Start simulation with high arrival rate for faster testing
    await simulator.setArrivalRate(10)
    await simulator.setSimSpeed(10)
    await simulator.clickPlayButton()

    // Wait for items to complete
    await simulator.waitForItemsToFlow(1, 30000)

    const completed = await simulator.countCompletedItems()
    expect(completed).toBeGreaterThanOrEqual(1)

    // Stop simulation
    await simulator.clickPlayButton()
  })

  test('should inject defects and process them', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Start simulation first with fast speed
    await simulator.setSimSpeed(10)
    await simulator.clickPlayButton()

    // Inject a defect while running
    await simulator.clickInjectDefect()

    // Wait for defect to complete
    await simulator.waitForItemsToFlow(1, 30000)

    const completed = await simulator.countCompletedItems()
    expect(completed).toBeGreaterThanOrEqual(1)

    await simulator.clickPlayButton()
  })

  test('should respect WIP limits', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Open Analysis step config
    await simulator.openStepConfig('Analysis')

    // Set WIP limit to 1
    await simulator.setStepField('WIP Limit', '1')

    // Inject multiple items
    await simulator.clickInjectDefect()
    await simulator.clickInjectDefect()
    await simulator.clickInjectDefect()

    // Start simulation briefly
    await simulator.setSimSpeed(50)
    await simulator.clickPlayButton()
    await page.waitForTimeout(1000)
    await simulator.clickPlayButton()

    // Verify WIP limit is respected (max 1 in process)
    const inProcess = await simulator.countItemsInProcess('Analysis')
    expect(inProcess).toBeLessThanOrEqual(1)
  })

  test('should show bottleneck indicator when queue exceeds threshold', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Create a bottleneck: set first step WIP to 1, inject many items
    await simulator.openStepConfig('Analysis')
    await simulator.setStepField('WIP Limit', '1')

    // Inject many defects
    for (let i = 0; i < 7; i++) {
      await simulator.clickInjectDefect()
    }

    // Wait a moment for items to appear
    await page.waitForTimeout(500)

    // Check for bottleneck indicator
    const hasIndicator = await simulator.hasBottleneckIndicator('Analysis')
    expect(hasIndicator).toBe(true)
  })
})

test.describe('Step Configuration', () => {
  test('should add a new step before existing step', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    const initialSteps = await simulator.countSteps()

    // Open Analysis step config
    await simulator.openStepConfig('Analysis')

    // Click "+ Before"
    await simulator.clickStepConfigButton('+ Before')

    // Verify new step appears
    const newSteps = await simulator.countSteps()
    expect(newSteps).toBe(initialSteps + 1)
    expect(await simulator.isStepVisible('New Step')).toBe(true)
  })

  test('should add a new step after existing step', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    const initialSteps = await simulator.countSteps()

    // Open Analysis step config
    await simulator.openStepConfig('Analysis')

    // Click "+ After"
    await simulator.clickStepConfigButton('+ After')

    // Verify new step appears
    const newSteps = await simulator.countSteps()
    expect(newSteps).toBe(initialSteps + 1)
    expect(await page.locator('text=New Step 5').isVisible()).toBe(true)
  })

  test('should remove a step', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Open Testing step config
    await simulator.openStepConfig('Testing')

    // Click Remove
    await simulator.clickStepConfigButton('Remove')

    // Verify Testing step is removed
    await page.waitForTimeout(300)
    expect(await page.locator('text=3. Testing').isVisible()).toBe(false)
  })

  test('should edit step WIP limit', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Open Development step config
    await simulator.openStepConfig('Development')

    // Update WIP Limit
    await simulator.setStepField('WIP Limit', '5')

    // Verify value updated
    expect(await simulator.getStepField('WIP Limit')).toBe('5')
  })

  test('should edit step process time', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    await simulator.openStepConfig('Development')
    await simulator.setStepField('Proc. Time', '10')
    expect(await simulator.getStepField('Proc. Time')).toBe('10')

    // Close config menu
    await page.keyboard.press('Escape')
  })

  test('should edit step PCA percentage', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    await simulator.openStepConfig('Development')
    await simulator.setStepField('PCA', '85')
    expect(await simulator.getStepField('PCA')).toBe('85')
  })

  test('should edit step process time standard deviation', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    await simulator.openStepConfig('Testing')
    await simulator.setStepField('Proc. Time SD', '2')
    expect(await simulator.getStepField('Proc. Time SD')).toBe('2')
  })

  test('should move step left', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Open Development step (index 1)
    await simulator.openStepConfig('Development')

    // Click Move Left
    await simulator.clickStepConfigButton('Move Left')

    // Wait for reorder
    await page.waitForTimeout(500)

    // Verify Development is now before Analysis
    const developmentBox = await page
      .locator('div.relative.w-72:has-text("1. Development")')
      .boundingBox()
    const analysisBox = await page
      .locator('div.relative.w-72:has-text("2. Analysis")')
      .boundingBox()

    expect(developmentBox?.x).toBeLessThan(analysisBox?.x || Infinity)
  })

  test('should move step right', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Open Development step
    await simulator.openStepConfig('Development')

    // Click Move Right
    await simulator.clickStepConfigButton('Move Right')

    // Wait for reorder
    await page.waitForTimeout(500)

    // Verify Development is now after Testing
    const developmentBox = await page
      .locator('div.relative.w-72:has-text("3. Development")')
      .boundingBox()
    const testingBox = await page.locator('div.relative.w-72:has-text("2. Testing")').boundingBox()

    expect(developmentBox?.x).toBeGreaterThan(testingBox?.x || 0)
  })

  test('should disable move left button for first step', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Open first step
    await simulator.openStepConfigByIndex(0)

    // Verify Move Left is disabled
    const moveLeftButton = page.getByRole('button', { name: /move left/i })
    expect(await moveLeftButton.isDisabled()).toBe(true)
  })

  test('should disable move right button for last step', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Open last step (Deploy)
    await simulator.openStepConfig('Deploy')

    // Verify Move Right is disabled
    const moveRightButton = page.getByRole('button', { name: /move right/i })
    expect(await moveRightButton.isDisabled()).toBe(true)
  })
})

test.describe('Metrics Dashboard', () => {
  test('should display metrics dashboard with initial values', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Check initial metrics are displayed using data-testid
    expect(await page.getByTestId('metric-avg-lead-time').isVisible()).toBe(true)
    expect(await page.getByTestId('metric-throughput').isVisible()).toBe(true)
    expect(await page.getByTestId('metric-flow-efficiency').isVisible()).toBe(true)
    expect(await page.getByTestId('metric-defect-rate').isVisible()).toBe(true)
  })

  test('should update metrics as simulation runs', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Get initial throughput
    const initialThroughput = await simulator.getMetric('Throughput')

    // Run simulation
    await simulator.setArrivalRate(10)
    await simulator.setSimSpeed(10)
    await simulator.clickPlayButton()

    // Wait for items to complete
    await simulator.waitForItemsToFlow(3, 30000)

    // Check metrics updated
    await simulator.waitForMetricChange('Throughput', initialThroughput)
    const newThroughput = await simulator.getMetric('Throughput')
    expect(newThroughput).not.toBe(initialThroughput)

    // Stop simulation
    await simulator.clickPlayButton()
  })

  test('should calculate flow efficiency', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Run simulation to generate metrics
    await simulator.setArrivalRate(10)
    await simulator.setSimSpeed(10)
    await simulator.clickPlayButton()
    await simulator.waitForItemsToFlow(2, 30000)
    await simulator.clickPlayButton()

    // Get flow efficiency
    const flowEfficiency = await simulator.getMetric('Flow Efficiency')

    // Should be a percentage value
    expect(flowEfficiency).toMatch(/\d+%/)
    const percentage = parseInt(flowEfficiency)
    expect(percentage).toBeGreaterThanOrEqual(0)
    expect(percentage).toBeLessThanOrEqual(100)
  })

  test('should track defect rate', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Inject defects
    await simulator.clickInjectDefect()
    await simulator.clickInjectDefect()

    // Run simulation
    await simulator.setSimSpeed(10)
    await simulator.clickPlayButton()
    await simulator.waitForItemsToFlow(2, 30000)
    await simulator.clickPlayButton()

    // Check defect rate
    const defectRate = await simulator.getMetric('Defect Rate')
    expect(defectRate).toMatch(/\d+%/)
  })
})

test.describe('Edge Cases and Validation', () => {
  test('should handle single step pipeline', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Remove all but one step
    await simulator.openStepConfig('Deploy')
    await simulator.clickStepConfigButton('Remove')

    await simulator.openStepConfig('Testing')
    await simulator.clickStepConfigButton('Remove')

    await simulator.openStepConfig('Development')
    await simulator.clickStepConfigButton('Remove')

    // Verify single step remains
    expect(await simulator.countSteps()).toBe(1)

    // Run simulation with single step
    await simulator.clickInjectDefect()
    await simulator.setSimSpeed(10)
    await simulator.clickPlayButton()
    await simulator.waitForItemsToFlow(1, 30000)

    // Verify item completed
    expect(await simulator.countCompletedItems()).toBeGreaterThanOrEqual(1)
  })

  test('should handle zero arrival rate', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Set arrival rate to 0
    await simulator.setArrivalRate(0)
    expect(await simulator.getArrivalRate()).toBe(0)

    // Start simulation
    await simulator.setSimSpeed(10)
    await simulator.clickPlayButton()
    await simulator.waitForTick(50)
    await simulator.clickPlayButton()

    // Verify no items were auto-created (only manual injection would create items)
    const queueCount = await simulator.countItemsInQueue('Analysis')
    expect(queueCount).toBe(0)
  })

  test('should handle high arrival rate', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Set maximum arrival rate
    await simulator.setArrivalRate(10)
    expect(await simulator.getArrivalRate()).toBe(10)

    // Run simulation
    await simulator.setSimSpeed(10)
    await simulator.clickPlayButton()
    await simulator.waitForTick(100)

    // Should create many items
    const analysisQueue = await simulator.countItemsInQueue('Analysis')
    const analysisProcess = await simulator.countItemsInProcess('Analysis')
    const total = analysisQueue + analysisProcess

    expect(total).toBeGreaterThan(0)
  })

  test('should handle configuration changes during simulation', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Start simulation
    await simulator.setArrivalRate(5)
    await simulator.setSimSpeed(50)
    await simulator.clickPlayButton()
    await simulator.waitForTick(10)

    // Change WIP limit while running
    await simulator.openStepConfig('Development')
    await simulator.setStepField('WIP Limit', '1')
    await page.keyboard.press('Escape')

    // Continue simulation
    await simulator.waitForTick(20)
    await simulator.clickPlayButton()

    // Verify simulation continued without errors
    const tick = await simulator.getTick()
    expect(tick).toBeGreaterThanOrEqual(20)
  })

  test('should persist step count after adding multiple steps', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    const initialCount = await simulator.countSteps()

    // Add multiple steps
    await simulator.openStepConfigByIndex(0)
    await simulator.clickStepConfigButton('+ After')

    await simulator.openStepConfigByIndex(1)
    await simulator.clickStepConfigButton('+ After')

    await simulator.openStepConfigByIndex(2)
    await simulator.clickStepConfigButton('+ After')

    // Verify all steps were added
    const finalCount = await simulator.countSteps()
    expect(finalCount).toBe(initialCount + 3)
  })
})

test.describe('End-to-End User Workflows', () => {
  test('should complete full simulation workflow: configure, run, analyze', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // 1. Configure pipeline
    await simulator.openStepConfig('Analysis')
    await simulator.setStepField('WIP Limit', '3')
    await page.keyboard.press('Escape')

    await simulator.openStepConfig('Development')
    await simulator.setStepField('Proc. Time', '5')
    await page.keyboard.press('Escape')

    // 2. Set arrival rate
    await simulator.setArrivalRate(8)

    // 3. Run simulation
    await simulator.setSimSpeed(10)
    await simulator.clickPlayButton()
    await simulator.waitForItemsToFlow(5, 40000)
    await simulator.clickPlayButton()

    // 4. Verify results
    const completed = await simulator.countCompletedItems()
    expect(completed).toBeGreaterThanOrEqual(5)

    const throughput = await simulator.getMetric('Throughput')
    expect(throughput).not.toBe('0')

    const leadTime = await simulator.getMetric('Avg Lead Time')
    expect(leadTime).toMatch(/\d+h/)
  })

  test('should handle reset and restart workflow', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // First run
    await simulator.setArrivalRate(10)
    await simulator.setSimSpeed(10)
    await simulator.clickPlayButton()
    await simulator.waitForTick(30)
    await simulator.clickPlayButton()

    const tick1 = await simulator.getTick()
    expect(tick1).toBeGreaterThanOrEqual(30)

    // Reset
    await simulator.clickResetButton()
    expect(await simulator.getTick()).toBe(0)

    // Second run
    await simulator.clickPlayButton()
    await simulator.waitForTick(20)
    await simulator.clickPlayButton()

    const tick2 = await simulator.getTick()
    expect(tick2).toBeGreaterThanOrEqual(20)
    expect(tick2).toBeLessThan(tick1)
  })

  test('should handle complex pipeline reconfiguration', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Remove a step
    await simulator.openStepConfig('Testing')
    await simulator.clickStepConfigButton('Remove')

    // Add a new step
    await simulator.openStepConfig('Development')
    await simulator.clickStepConfigButton('+ After')

    // Reorder steps
    await simulator.openStepConfig('Deploy')
    await simulator.clickStepConfigButton('Move Left')

    await page.waitForTimeout(500)

    // Run simulation on reconfigured pipeline
    await simulator.setSimSpeed(10)
    await simulator.clickInjectDefect()
    await simulator.clickPlayButton()
    await simulator.waitForItemsToFlow(1, 30000)

    // Verify simulation works with new configuration
    expect(await simulator.countCompletedItems()).toBeGreaterThanOrEqual(1)
  })

  test('should stress test with many defects and high load', async ({ page }) => {
    const simulator = new SimulatorPage(page)

    // Inject many defects
    for (let i = 0; i < 5; i++) {
      await simulator.clickInjectDefect()
    }

    // Set high arrival rate
    await simulator.setArrivalRate(10)
    await simulator.setSimSpeed(10)

    // Run simulation
    await simulator.clickPlayButton()
    await simulator.waitForItemsToFlow(10, 60000)
    await simulator.clickPlayButton()

    // Verify system handled load
    const completed = await simulator.countCompletedItems()
    expect(completed).toBeGreaterThanOrEqual(10)

    // Verify metrics are reasonable
    const throughput = await simulator.getMetric('Throughput')
    expect(parseInt(throughput)).toBeGreaterThan(0)
  })
})

test.describe('Visual and UI Verification', () => {
  test('should display all initial pipeline steps', async ({ page }) => {
    // Verify all default steps are visible
    expect(await page.locator('text=1. Analysis').isVisible()).toBe(true)
    expect(await page.locator('text=2. Development').isVisible()).toBe(true)
    expect(await page.locator('text=3. Testing').isVisible()).toBe(true)
    expect(await page.locator('text=4. Deploy').isVisible()).toBe(true)
  })

  test('should display completed items bin', async ({ page }) => {
    expect(await page.locator('text=Done').isVisible()).toBe(true)
  })

  test('should display step metadata', async ({ page }) => {
    const simulator = new SimulatorPage(page)
    const step = await simulator.getStepByName('Analysis')

    // Verify step displays WIP, PCA, and process time
    expect(await step.locator('text=/WIP: \\d+/').isVisible()).toBe(true)
    expect(await step.locator('text=/PCA: \\d+%/').isVisible()).toBe(true)
    expect(await step.locator('text=/~\\d+h/').isVisible()).toBe(true)
    expect(await step.locator('text=/Wait: \\d+h/').isVisible()).toBe(true)
  })

  test('should show queue and active sections in each step', async ({ page }) => {
    const simulator = new SimulatorPage(page)
    const step = await simulator.getStepByName('Development')

    // Verify both sections exist
    expect(await step.locator('text=/Queue/i').isVisible()).toBe(true)
    expect(await step.locator('text=/Active/i').isVisible()).toBe(true)
  })

  test('should display open slots in process column', async ({ page }) => {
    const simulator = new SimulatorPage(page)
    const step = await simulator.getStepByName('Analysis')

    // Should show open slots equal to WIP limit (2 by default)
    const openSlots = await step.locator('text=Open Slot').count()
    expect(openSlots).toBe(2)
  })
})
