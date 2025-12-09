import { useState } from 'react';
import type { StepConfig } from './types';
import { useSimulation } from './hooks/useSimulation';
import { useSimulationStats } from './hooks/useSimulationStats';
import { Header, Sidebar, StepColumn, CompletedBin } from './components';

const DEFAULT_STEPS: StepConfig[] = [
  { id: 's1', name: 'Analysis', wipLimit: 2, processTimeAvg: 4, processTimeStdDev: 1, pca: 98, waitTime: 0 },
  { id: 's2', name: 'Development', wipLimit: 3, processTimeAvg: 6, processTimeStdDev: 1, pca: 95, waitTime: 0 },
  { id: 's3', name: 'Testing', wipLimit: 2, processTimeAvg: 4, processTimeStdDev: 1, pca: 95, waitTime: 0 },
  { id: 's4', name: 'Deploy', wipLimit: 2, processTimeAvg: 2, processTimeStdDev: 1, pca: 99, waitTime: 0 },
];

export default function App() {
  // Configuration state
  const [steps, setSteps] = useState<StepConfig[]>(DEFAULT_STEPS);
  const [arrivalRate, setArrivalRate] = useState<number>(3);
  const [tickSpeed, setTickSpeed] = useState<number>(100);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Simulation hook
  const { items, completedItems, tick, createItem, resetSimulation, setSteps: setSimSteps } = useSimulation({
    steps,
    arrivalRate,
    tickSpeed,
    isPlaying
  });

  // Statistics hook
  const stats = useSimulationStats(completedItems);

  // Handlers
  const handleTogglePlay = () => setIsPlaying(!isPlaying);

  const handleReset = () => {
    resetSimulation();
    setIsPlaying(false);
  };

  const handleInjectDefect = () => createItem('DEFECT');

  const handleAddStep = (index: number) => {
    const newStep: StepConfig = {
      id: `s${steps.length + 1}`,
      name: `New Step ${steps.length + 1}`,
      wipLimit: 2,
      processTimeAvg: 4,
      processTimeStdDev: 1,
      pca: 95,
      waitTime: 0
    };

    const newSteps = [...steps];
    newSteps.splice(index, 0, newStep);
    setSteps(newSteps);
    setSimSteps(newSteps);
  };

  const handleRemoveStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
    setSimSteps(newSteps);
  };

  const handleMoveStep = (index: number, direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= steps.length) return;

    const newSteps = [...steps];
    const [movedStep] = newSteps.splice(index, 1);
    newSteps.splice(newIndex, 0, movedStep);
    setSteps(newSteps);
    setSimSteps(newSteps);
  };

  const handleUpdateStep = (index: number, field: keyof StepConfig, value: number) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
    setSimSteps(newSteps);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-800">
      <Header
        tick={tick}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onReset={handleReset}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          arrivalRate={arrivalRate}
          tickSpeed={tickSpeed}
          stats={stats}
          onArrivalRateChange={setArrivalRate}
          onTickSpeedChange={setTickSpeed}
          onInjectDefect={handleInjectDefect}
        />

        <main className="flex-1 p-8 overflow-x-auto overflow-y-hidden bg-slate-100">
          <div className="flex items-start h-full gap-6 min-w-max">
            {steps.map((step, index) => (
              <StepColumn
                key={step.id}
                step={step}
                stepIndex={index}
                totalSteps={steps.length}
                items={items}
                onAddStep={handleAddStep}
                onRemoveStep={handleRemoveStep}
                onMoveStep={handleMoveStep}
                onUpdateStep={handleUpdateStep}
              />
            ))}

            <CompletedBin completedItems={completedItems} />
          </div>
        </main>
      </div>
    </div>
  );
}
