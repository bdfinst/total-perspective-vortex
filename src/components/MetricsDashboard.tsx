import { BarChart3 } from 'lucide-react';
import type { SimulationStats } from '../types';
import { MetricCard } from './MetricCard';
import { LeadTimeHistogram } from './LeadTimeHistogram';

interface MetricsDashboardProps {
  stats: SimulationStats;
}

export function MetricsDashboard({ stats }: MetricsDashboardProps) {
  return (
    <div className="flex-1 p-5 bg-slate-50">
      <h2 className="flex items-center gap-2 mb-4 text-xs font-bold tracking-wider uppercase text-slate-400">
        <BarChart3 size={14} /> Metrics
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <MetricCard label="Avg Lead Time" value={`${stats.avgLeadTime}h`} />
        <MetricCard label="Throughput" value={stats.throughput} />
        <MetricCard
          label="Flow Efficiency"
          value={`${stats.flowEfficiency}%`}
          color={stats.flowEfficiency > 30 ? 'text-green-600' : 'text-slate-900'}
        />
        <MetricCard
          label="Defect Rate"
          value={`${stats.defectRate}%`}
          color={stats.defectRate > 20 ? 'text-red-600' : 'text-slate-900'}
        />
      </div>

      <LeadTimeHistogram leadTimes={stats.leadTimes} avgLeadTime={stats.avgLeadTime} />
    </div>
  );
}
