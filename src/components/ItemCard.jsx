import { Bug } from 'lucide-react'
import { cn } from '../utils/simulation'

export function ItemCard({ item }) {
  const isDefect = item.type === 'DEFECT'

  return (
    <div
      className={cn(
        'relative p-2 rounded-md border shadow-sm select-none transition-all duration-300',
        isDefect ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200',
        item.isRework && 'ring-2 ring-orange-400 ring-offset-1'
      )}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span
          className={cn(
            'text-[9px] font-bold px-1 rounded text-white',
            isDefect ? 'bg-red-500' : 'bg-blue-500'
          )}
        >
          {isDefect ? <Bug size={12} className="inline-block" /> : item.type[0]}
        </span>
        <span className="text-[9px] font-mono text-slate-500">#{item.id}</span>
      </div>

      {item.state === 'PROCESS' && !item.finishedAt && (
        <div className="w-full h-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className={cn(
              'h-full transition-all duration-300',
              isDefect ? 'bg-red-500' : 'bg-blue-500'
            )}
            style={{ width: `${item.progress}%` }}
          />
        </div>
      )}

      {item.isRework && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold shadow-sm z-10">
          !
        </div>
      )}
    </div>
  )
}
