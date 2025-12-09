import { Settings, Bug } from 'lucide-react'

export function SimulationControls({
  arrivalRate,
  tickSpeed,
  onArrivalRateChange,
  onTickSpeedChange,
  onInjectDefect,
}) {
  return (
    <div className="p-5 space-y-6 border-b border-slate-100">
      <h2 className="flex items-center gap-2 mb-2 text-xs font-bold tracking-wider uppercase text-slate-400">
        <Settings size={14} /> Variables
      </h2>

      {/* Arrival Rate */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-slate-700">Arrival Rate</label>
          <span
            data-testid="arrival-rate-display"
            className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600"
          >
            {arrivalRate} / wk
          </span>
        </div>
        <input
          data-testid="arrival-rate-slider"
          type="range"
          min="0"
          max="10"
          step="1"
          value={arrivalRate}
          onChange={(e) => onArrivalRateChange(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between mt-1 text-[10px] text-slate-400">
          <span>Low Load</span>
          <span>High Load</span>
        </div>
      </div>

      {/* Sim Speed */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-slate-700">Sim Speed</label>
        </div>
        <input
          data-testid="sim-speed-slider"
          type="range"
          min="10"
          max="500"
          step="10"
          value={510 - tickSpeed}
          onChange={(e) => onTickSpeedChange(510 - Number(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <button
        data-testid="inject-defect-button"
        onClick={onInjectDefect}
        className="w-full py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-bold hover:bg-red-100 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
      >
        <Bug size={16} /> Inject Production Defect
      </button>
    </div>
  )
}
