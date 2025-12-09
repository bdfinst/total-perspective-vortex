# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Value Stream Simulator** built with React, TypeScript, and Vite. It provides an interactive simulation of a software delivery pipeline, visualizing workflow, bottlenecks, and the impact of system constraints like WIP limits, PCA (Percent Complete & Accurate), and arrival rates.

**Tech Stack:**
- React 19 (functional components + hooks)
- TypeScript (strict mode)
- Vite (build tool)
- Tailwind CSS (all styling)
- lucide-react (icons)
- Playwright (E2E testing)

## Common Commands

### Development
```bash
npm run dev          # Start dev server with HMR (default: http://localhost:5173)
npm run build        # TypeScript compile + Vite production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint on codebase
```

### Testing
```bash
npm test             # Run Playwright E2E tests (requires dev server running)
```

**Important:** Playwright tests expect the dev server to be running at `http://localhost:5173/`. Start the dev server first with `npm run dev` before running tests.

## Architecture

### Single-File Application
The entire application is contained in `src/App.tsx` (~700 lines). This is an intentional architectural decision for this simulation tool.

**Core Components:**
1. **Simulation Engine** (pure functions)
   - `tickSimulation()`: Advances simulation by one tick (1 tick = 1 hour)
   - Work item movement through pipeline stages
   - PCA (Percent Complete & Accurate) validation
   - Rework logic when PCA check fails

2. **State Management** (React hooks)
   - `useState`: steps, items, completedItems, tick, isRunning, arrivalRate, tickSpeed
   - `useRef`: intervalRef for simulation loop
   - `useMemo`: calculated stats (throughput, lead time, flow efficiency)
   - `useEffect`: auto-injection based on arrival rate

3. **Domain Models** (TypeScript interfaces)
   - `WorkItem`: Tracks individual work items (Features/Defects) through the pipeline
   - `StepConfig`: Defines pipeline stages with WIP limits, process times, PCA
   - `SimulationStats`: Aggregated metrics

### Key Concepts

**Work Item Flow:**
- Each item has two states per step: `QUEUE` (waiting) → `PROCESS` (active work)
- Items advance when PCA check passes; otherwise they rework (move backward)
- `valueAddedTime` tracks actual processing time (vs wait time in queues)
- Items are identified by uppercase 6-character IDs

**Presets:**
- `OPTIMIZED`: Low WIP (2-3), High PCA (95-98%), smooth flow
- `PUSH`: Infinite WIP (100), simulates waterfall with queue buildup
- `CRISIS`: Low PCA (50-70%), causes rework loops
- `BOTTLENECK`: Development step 3x slower than others

**Pipeline Editing:**
- Users can add/remove/reorder steps dynamically
- Each step has configurable: WIP limit, process time (avg/stddev), PCA
- Step changes automatically adjust work item indices

## Styling Conventions

- **Tailwind CSS only** - no external CSS files
- Uses `cn()` utility (clsx + tailwind-merge) for conditional classes
- Color palette: Slate (neutral), Blue (features), Red (defects)
- Responsive design with sidebar layout
- Visual indicators: Red/orange backgrounds when queues exceed 5 items

## TypeScript Configuration

- Strict mode enabled (`strict: true`)
- `noUnusedLocals` and `noUnusedParameters` enforced
- `moduleResolution: "bundler"` (Vite-specific)
- `jsx: "react-jsx"` (automatic JSX runtime)

## Testing Approach

Playwright E2E tests verify:
- Applying preset scenarios
- Adding/removing pipeline steps
- Editing step properties
- Reordering steps

Tests use visual selectors and text matching (see `tests/value-stream-simulator.spec.ts`).

## Development Notes

- Time is measured in "hours" in the UI but internally managed as "ticks" (1 tick = 1 hour)
- Simulation speed controlled by `tickSpeed` (ms between ticks)
- Auto-injection uses "Items/Week" but converts to tick-based injection logic
- Process times use normal distribution (avg ± stddev) for realism
- PCA checks use random rolls (Math.random()) to determine pass/fail
