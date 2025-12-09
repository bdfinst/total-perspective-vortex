# Total Perspective Vortex (React + Tailwind)

Role: Senior Frontend Engineer & UX Designer
Objective: Build a polished, interactive Value Stream Simulator that models software delivery flow.
Key Requirement: The user must be able to visualize the impact of common delivery constraints (like "Push" vs "Pull") and simulate real-world scenarios like production defects and variable arrival rates.
Tech Stack
Framework: React (Functional Components + Hooks).
Styling: Tailwind CSS (Modern SaaS aesthetic, Slate/Blue/Red palette).
Icons: lucide-react.
State: Pure functional state updates.

1. Domain Logic Updates
A. Time Representation (Hours)
Internally, the engine still runs on "ticks" (e.g., 1 tick = 1 hour).
UI Requirement: All inputs and displays must use "Hours" instead of ticks.
Example: "Process Time: 4 Hours".
Metrics: "Avg Cycle Time: 42 Hours".
B. Work Item Types
Support two distinct types of work:
Feature (Blue): Standard value delivery.
Defect (Red): Represents failure demand.
Visuals: Distinct color (Red) and shape/icon to differentiate from Features.
C. Auto-Injection (Arrival Rate)
Replace manual "Add Work" clicking with an Auto-Inject Control.
Slider: "Arrival Rate (Items/Week)" or "Items/Hour".
Logic: Automatically inject a new Work Item at Step 1 based on the selected frequency.
D. Production Defects
"Inject Production Defect" Button: specific action that simulates a bug found in production.
Behavior: Immediately creates a Defect item at Step 1 (Backlog), effectively increasing the load on the system with unplanned work.
2. "Constraints & Scenarios" Control Panel
Create a sidebar or dropdown menu titled "System Constraints" that allows the user to apply presets to the pipeline instantly:
"Optimized Flow": Sets low WIP limits (e.g., 2), high PCA (95%), and balanced process times.
"Push System (Waterfall)": Sets all WIP limits to Infinity (or 100) and large batch sizes. (Visualizes piling up queues).
"Quality Crisis": Lowers PCA at all steps (e.g., 60%), causing massive rework loops.
"Bottlenecked": Sets the middle step (e.g., Development) to have 3x the process time of others.
3. UI/UX Requirements
The Simulator Canvas ("Infinite Flow")
Pipeline Visualization: distinct columns for Queue (Wait) and Process (Active) within each step.
Bottleneck Indicators: If a queue exceeds 5 items, turn the background red/orange.
The Dashboard (Metrics)
Lead Time Distribution: A histogram or scatter plot showing how long items take.
Flow Efficiency: (Value Added Time / Total Lead Time) %.
Defect Rate: Percentage of items that are Defects vs Features.
4. Implementation Structure
Provide a single-file React component (App.tsx) that includes:
SimulationEngine (Pure functions for movement, PCA rolls, time tracking).
ControlPanel (The presets and auto-inject toggles).
PipelineVisuals (The rendered steps and dots).
StatsOverlay (The math).
Note: Ensure the code is strictly typed (TypeScript) and uses Tailwind for all styling. No external CSS files.
