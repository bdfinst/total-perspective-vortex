import { useState } from 'react'
import { AlertTriangle, Settings } from 'lucide-react'
import { cn } from '../utils/simulation'
import { ItemCard } from './ItemCard'
import { StepConfigMenu } from './StepConfigMenu'

export function StepColumn({
  step,
  stepIndex,
  totalSteps,
  items,
  onAddStep,
  onRemoveStep,
  onMoveStep,
  onUpdateStep,
}) {
  const [openConfigMenu, setOpenConfigMenu] = useState(false)

  const queueItems = items.filter((i) => i.stepIndex === stepIndex && i.state === 'QUEUE')
  const processItems = items.filter((i) => i.stepIndex === stepIndex && i.state === 'PROCESS')
  const isBottleneck = queueItems.length > 5

  return (
    <div
      data-testid={`step-column-${step.id}`}
      className="relative w-72 flex flex-col h-[600px] bg-white rounded-xl shadow-sm border border-slate-300 flex-shrink-0"
    >
      {/* Step Header */}
      <div
        className={cn('p-3 border-b border-slate-100', isBottleneck ? 'bg-red-50' : 'bg-slate-50')}
      >
        <div className="flex items-center justify-between mb-1">
          <span data-testid={`step-name-${step.id}`} className="text-sm font-bold text-slate-800">
            {stepIndex + 1}. {step.name}
          </span>
          <div className="flex items-center gap-2">
            {isBottleneck && (
              <AlertTriangle
                data-testid={`bottleneck-indicator-${step.id}`}
                size={16}
                className="text-red-500 animate-pulse"
              />
            )}
            <button
              data-testid={`step-config-button-${step.id}`}
              onClick={() => setOpenConfigMenu(!openConfigMenu)}
              className="p-1 rounded-full hover:bg-slate-200"
            >
              <Settings size={16} />
            </button>
          </div>
        </div>
        <div className="flex gap-2 text-[10px] text-slate-500 font-mono">
          <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">
            WIP: {step.wipLimit}
          </span>
          <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">
            PCA: {step.pca}%
          </span>
          <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">
            ~{step.processTimeAvg}h
          </span>
          <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">
            Wait: {step.waitTime}h
          </span>
        </div>
      </div>

      {openConfigMenu && (
        <StepConfigMenu
          step={step}
          stepIndex={stepIndex}
          totalSteps={totalSteps}
          onAddBefore={() => onAddStep(stepIndex)}
          onAddAfter={() => onAddStep(stepIndex + 1)}
          onMoveLeft={() => onMoveStep(stepIndex, 'left')}
          onMoveRight={() => onMoveStep(stepIndex, 'right')}
          onUpdateField={(field, value) => onUpdateStep(stepIndex, field, value)}
          onRemove={() => onRemoveStep(stepIndex)}
        />
      )}

      {/* Columns */}
      <div className="flex flex-1 overflow-hidden divide-x divide-slate-100">
        {/* Wait Column */}
        <div
          data-testid={`queue-section-${step.id}`}
          className={cn(
            'w-1/2 flex flex-col p-2 gap-2 overflow-y-auto bg-slate-50/50 transition-colors',
            isBottleneck && 'bg-red-50/30'
          )}
        >
          <div className="text-[9px] uppercase font-bold text-slate-400 text-center tracking-wider sticky top-0">
            Queue ({queueItems.length})
          </div>
          {queueItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Process Column */}
        <div
          data-testid={`process-section-${step.id}`}
          className="relative flex flex-col w-1/2 gap-2 p-2 overflow-y-auto bg-white"
        >
          <div className="text-[9px] uppercase font-bold text-blue-400 text-center tracking-wider sticky top-0">
            Active ({processItems.length})
          </div>

          {processItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}

          {/* Empty Slots Phantom */}
          {Array.from({ length: Math.max(0, step.wipLimit - processItems.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex items-center justify-center h-12 border border-dashed rounded border-slate-200"
            >
              <span className="text-[9px] text-slate-300">Open Slot</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
