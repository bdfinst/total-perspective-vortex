# Project Overview

This project is a Value Stream Simulator built with React, TypeScript, and Vite. It provides an interactive simulation of a software delivery pipeline, allowing users to visualize workflow, identify bottlenecks, and understand the impact of different system constraints.

**Main Technologies:**

*   **Framework:** React (with Hooks)
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Icons:** lucide-react

**Architecture:**

The application is architected as a single-page application within a single file (`src/App.tsx`). It includes:

*   **Simulation Engine:** A core set of functions to manage the movement of work items through the pipeline, handle state updates, and calculate metrics.
*   **React Components:** A set of functional components for rendering the pipeline, control panel, and statistics dashboard.
*   **State Management:** Component-level state management using `useState`, `useRef`, `useMemo`, and `useEffect` hooks.

# Building and Running

The following scripts are available to build, run, and test the project:

*   **`npm run dev`**: Starts the development server with Hot Module Replacement (HMR).
*   **`npm run build`**: Compiles the TypeScript code and bundles the application for production.
*   **`npm run lint`**: Lints the codebase for potential errors and style issues.
*   **`npm run preview`**: Starts a local server to preview the production build.

# Development Conventions

Based on the project setup, the following development conventions are in place:

*   **Styling**: All styling should be done using Tailwind CSS utility classes. External CSS files should not be used.
*   **Component Structure**: The application is composed of functional React components. The main application logic is contained within the `src/App.tsx` file.
*   **State Management**: State is managed locally within components using React Hooks.
*   **Code Quality**: The project is configured with ESLint for static code analysis. Run `npm run lint` to check for any issues.
*   **Type Safety**: The project uses TypeScript for static typing. All new code should be strictly typed.
