import { useCallback, useEffect, useRef, useState } from 'react'
import { createWorkItem, normalRandom } from '../utils/simulation'

export function useSimulation({ steps, arrivalRate, tickSpeed, isPlaying }) {
  const [items, setItems] = useState([])
  const [completedItems, setCompletedItems] = useState([])
  const [tick, setTick] = useState(0)
  const [localSteps, setLocalSteps] = useState(steps)
  const injectionCounter = useRef(0)
  const tickRef = useRef(tick)
  const arrivalRateRef = useRef(arrivalRate)
  const localStepsRef = useRef(localSteps)

  // Keep refs in sync
  useEffect(() => {
    tickRef.current = tick
  }, [tick])

  useEffect(() => {
    arrivalRateRef.current = arrivalRate
  }, [arrivalRate])

  useEffect(() => {
    localStepsRef.current = localSteps
  }, [localSteps])

  // Update local steps when prop changes
  useEffect(() => {
    setLocalSteps(steps)
  }, [steps])

  const runTick = useCallback(() => {
    setTick((t) => t + 1)

    // Update wait times for steps
    setLocalSteps((currentSteps) =>
      currentSteps.map((step, index) => {
        const queueItems = items.filter((i) => i.stepIndex === index && i.state === 'QUEUE')
        const waitTime = queueItems.reduce(
          (acc, item) => acc + (tickRef.current - item.queueEnteredAt),
          0
        )
        return { ...step, waitTime }
      })
    )

    setItems((currentItems) => {
      const nextItems = currentItems.map((i) => ({ ...i }))

      // Auto-injection based on arrival rate
      injectionCounter.current += arrivalRateRef.current
      if (injectionCounter.current >= 50) {
        injectionCounter.current = 0
        nextItems.push(createWorkItem('FEATURE', tickRef.current))
      }

      // Process each item
      nextItems.forEach((item) => {
        const step = localStepsRef.current[item.stepIndex]

        // Queue -> Process transition
        if (item.state === 'QUEUE') {
          const activeInStep = nextItems.filter(
            (i) => i.stepIndex === item.stepIndex && i.state === 'PROCESS' && i.id !== item.id
          ).length

          if (activeInStep < step.wipLimit) {
            item.state = 'PROCESS'
          }
        }
        // Process -> Next Step or Rework
        else if (item.state === 'PROCESS') {
          item.valueAddedTime += 1

          const processTime = Math.max(1, normalRandom(step.processTimeAvg, step.processTimeStdDev))
          const increment = 100 / (processTime || 1)
          item.progress += increment

          if (item.progress >= 100) {
            const isQualityOk = Math.random() * 100 <= step.pca

            if (isQualityOk) {
              // Move forward
              if (item.stepIndex === localStepsRef.current.length - 1) {
                item.finishedAt = tickRef.current + 1
              } else {
                item.stepIndex += 1
                item.state = 'QUEUE'
                item.progress = 0
                item.queueEnteredAt = tickRef.current
              }
            } else {
              // Rework: reject backwards
              item.isRework = true
              item.state = 'QUEUE'
              item.progress = 0
              item.queueEnteredAt = tickRef.current
              if (item.stepIndex > 0) item.stepIndex -= 1
            }
          }
        }
      })

      // Archive completed items
      const finished = nextItems.filter((i) => i.finishedAt)
      if (finished.length > 0) {
        setCompletedItems((prev) => [...prev, ...finished])
      }

      return nextItems.filter((i) => !i.finishedAt)
    })
  }, [items])

  // Main simulation loop
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      runTick()
    }, tickSpeed)

    return () => clearInterval(interval)
  }, [isPlaying, tickSpeed, runTick])

  const createItem = (type) => {
    setItems((prev) => [...prev, createWorkItem(type, tick)])
  }

  const resetSimulation = () => {
    setItems([])
    setCompletedItems([])
    setTick(0)
    injectionCounter.current = 0
  }

  return {
    items,
    completedItems,
    tick,
    createItem,
    resetSimulation,
    setSteps: setLocalSteps,
  }
}
