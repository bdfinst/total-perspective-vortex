interface LeadTimeHistogramProps {
  leadTimes: number[];
  avgLeadTime: number;
}

export function LeadTimeHistogram({ leadTimes, avgLeadTime }: LeadTimeHistogramProps) {
  return (
    <div className="p-3 bg-white border rounded-lg shadow-sm border-slate-200">
      <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Lead Time Distribution</div>
      <div className="flex items-end justify-between h-24 gap-1">
        {leadTimes.slice(-20).map((time, idx) => {
          const height = Math.min(100, (time / (avgLeadTime * 2)) * 100);
          return (
            <div key={idx} className="relative w-full bg-blue-200 rounded-t-sm group" style={{ height: `${height}%` }}>
              <div className="hidden group-hover:block absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1 rounded z-10">
                {time}h
              </div>
            </div>
          );
        })}
        {leadTimes.length === 0 && <div className="flex items-center justify-center w-full h-full text-xs text-slate-300">No Data</div>}
      </div>
    </div>
  );
}
