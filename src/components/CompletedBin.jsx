import { ItemCard } from './ItemCard'

export function CompletedBin({ completedItems }) {
  return (
    <div
      data-testid="completed-bin"
      className="w-48 h-[600px] border-l-2 border-dashed border-slate-300 flex flex-col gap-4 p-4"
    >
      <div className="text-sm font-bold text-center uppercase text-slate-400">Done</div>
      <div
        data-testid="completed-items-container"
        className="flex-1 pr-2 space-y-2 overflow-y-auto"
      >
        {completedItems
          .slice()
          .reverse()
          .map((item) => (
            <div key={item.id} className="origin-left scale-95 opacity-60 grayscale">
              <ItemCard item={item} />
            </div>
          ))}
      </div>
    </div>
  )
}
