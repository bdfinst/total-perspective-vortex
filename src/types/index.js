// Domain Models and Types
// All TypeScript interfaces and types have been removed
// This file can remain as a placeholder for documentation purposes

// WorkType: 'FEATURE' | 'DEFECT'
// StepState: 'QUEUE' | 'PROCESS'

// WorkItem shape:
// {
//   id: string;
//   type: WorkType;
//   stepIndex: number;
//   state: StepState;
//   progress: number;      // 0-100%
//   createdAt: number;     // Tick timestamp
//   finishedAt?: number;   // Tick timestamp
//   valueAddedTime: number; // Ticks spent actively being processed
//   isRework?: boolean;
//   queueEnteredAt: number; // Tick timestamp
// }

// StepConfig shape:
// {
//   id: string;
//   name: string;
//   wipLimit: number;      // Limits items in PROCESS column
//   processTimeAvg: number;// Hours (Ticks) to complete
//   processTimeStdDev: number; // Standard deviation for process time
//   pca: number;           // Percent Complete & Accurate
//   waitTime: number;      // Calculated wait time for the step
// }

// SimulationStats shape:
// {
//   throughput: number;
//   avgLeadTime: number;
//   flowEfficiency: number;
//   defectRate: number;
//   leadTimes: number[];   // Array of lead times for histogram
// }
