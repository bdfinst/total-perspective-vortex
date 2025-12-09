import { Trash2 } from 'lucide-react';
import type { StepConfig } from '../types';

interface StepConfigMenuProps {
  step: StepConfig;
  stepIndex: number;
  totalSteps: number;
  onAddBefore: () => void;
  onAddAfter: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onUpdateField: (field: keyof StepConfig, value: number) => void;
  onRemove: () => void;
}

export function StepConfigMenu({
  step,
  stepIndex,
  totalSteps,
  onAddBefore,
  onAddAfter,
  onMoveLeft,
  onMoveRight,
  onUpdateField,
  onRemove
}: StepConfigMenuProps) {
  return (
    <div className="absolute z-10 w-64 p-4 -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg shadow-lg top-1/2 left-1/2">
      <h3 className="mb-2 text-sm font-bold">Edit: {step.name}</h3>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <button
          onClick={onAddBefore}
          className="w-full py-1 text-xs font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          + Before
        </button>
        <button
          onClick={onAddAfter}
          className="w-full py-1 text-xs font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          + After
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onMoveLeft}
          disabled={stepIndex === 0}
          className="w-full py-1 text-xs font-bold rounded-md bg-slate-300 text-slate-700 hover:bg-slate-400 disabled:opacity-50"
        >
          &larr; Move Left
        </button>
        <button
          onClick={onMoveRight}
          disabled={stepIndex === totalSteps - 1}
          className="w-full py-1 text-xs font-bold rounded-md bg-slate-300 text-slate-700 hover:bg-slate-400 disabled:opacity-50"
        >
          &rarr; Move Right
        </button>
      </div>

      <div className="flex items-center justify-between mt-2 mb-1">
        <label className="text-xs font-medium text-slate-600">WIP Limit</label>
        <input
          type="number"
          value={step.wipLimit}
          onChange={(e) => onUpdateField('wipLimit', Number(e.target.value))}
          className="w-16 p-1 text-xs text-right border rounded-md"
        />
      </div>

      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-medium text-slate-600">Proc. Time</label>
        <input
          type="number"
          value={step.processTimeAvg}
          onChange={(e) => onUpdateField('processTimeAvg', Number(e.target.value))}
          className="w-16 p-1 text-xs text-right border rounded-md"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-slate-600">PCA</label>
        <input
          type="number"
          value={step.pca}
          onChange={(e) => onUpdateField('pca', Number(e.target.value))}
          className="w-16 p-1 text-xs text-right border rounded-md"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-slate-600">Proc. Time SD</label>
        <input
          type="number"
          value={step.processTimeStdDev}
          onChange={(e) => onUpdateField('processTimeStdDev', Number(e.target.value))}
          className="w-16 p-1 text-xs text-right border rounded-md"
        />
      </div>

      <button
        onClick={onRemove}
        className="flex items-center justify-center w-full gap-1 py-1 mt-2 text-xs font-bold text-white bg-red-500 rounded-md hover:bg-red-600"
      >
        <Trash2 size={14} /> Remove
      </button>
    </div>
  );
}
