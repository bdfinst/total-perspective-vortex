import type { SimulationStats } from '../types';
import { SimulationControls } from './SimulationControls';
import { MetricsDashboard } from './MetricsDashboard';

interface SidebarProps {
  arrivalRate: number;
  tickSpeed: number;
  stats: SimulationStats;
  onArrivalRateChange: (rate: number) => void;
  onTickSpeedChange: (speed: number) => void;
  onInjectDefect: () => void;
}

export function Sidebar({
  arrivalRate,
  tickSpeed,
  stats,
  onArrivalRateChange,
  onTickSpeedChange,
  onInjectDefect
}: SidebarProps) {
  return (
    <aside className="flex flex-col overflow-y-auto bg-white border-r w-80 border-slate-200">
      <SimulationControls
        arrivalRate={arrivalRate}
        tickSpeed={tickSpeed}
        onArrivalRateChange={onArrivalRateChange}
        onTickSpeedChange={onTickSpeedChange}
        onInjectDefect={onInjectDefect}
      />

      <MetricsDashboard stats={stats} />
    </aside>
  );
}
