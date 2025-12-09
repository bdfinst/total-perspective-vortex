import { cn } from '../utils/simulation'

export function MetricCard({ label, value, color = 'text-slate-900' }) {
  return (
    <div
      data-testid={`metric-${label.toLowerCase().replace(/\s+/g, '-')}`}
      className="p-3 bg-white border rounded-lg shadow-sm border-slate-200"
    >
      <div className={cn('text-xl font-bold font-mono', color)}>{value}</div>
      <div className="text-[10px] text-slate-500 uppercase font-medium">{label}</div>
    </div>
  )
}
