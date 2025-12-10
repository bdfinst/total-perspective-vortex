import { Activity, Clock, Pause, Play, RotateCcw } from 'lucide-react'

import { cn } from '../utils/simulation'

export function Header({ tick, isPlaying, onTogglePlay, onReset }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
      <div className="flex items-center gap-3">
        <div className="p-2 text-white bg-blue-600 rounded-lg">
          <Activity size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Total Perspective Vortex</h1>
          <p className="text-xs text-slate-500">Flow Efficiency & Constraint Modeling</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
          <Clock size={16} className="text-slate-500" />
          <span data-testid="tick-counter" className="font-mono font-bold text-slate-700">
            {tick} Hrs
          </span>
        </div>

        <div className="w-px h-8 bg-slate-200"></div>

        <button
          data-testid="play-pause-button"
          onClick={onTogglePlay}
          className={cn(
            'flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all shadow-sm',
            isPlaying
              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-200'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
          )}
        >
          {isPlaying ? (
            <>
              <Pause size={18} /> Pause
            </>
          ) : (
            <>
              <Play size={18} /> Start Flow
            </>
          )}
        </button>

        <button
          data-testid="reset-button"
          onClick={onReset}
          className="p-2 transition-all rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50"
          title="Reset Simulation"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </header>
  )
}
