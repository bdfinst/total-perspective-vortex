import { useMemo } from 'react';
import type { WorkItem, SimulationStats } from '../types';

/**
 * Calculate simulation statistics from completed items
 */
export function useSimulationStats(completedItems: WorkItem[]): SimulationStats {
  return useMemo(() => {
    const total = completedItems.length;
    if (total === 0) {
      return {
        throughput: 0,
        avgLeadTime: 0,
        flowEfficiency: 0,
        defectRate: 0,
        leadTimes: []
      };
    }

    const leadTimes = completedItems.map(i => (i.finishedAt || 0) - i.createdAt);
    const totalLeadTime = leadTimes.reduce((a, b) => a + b, 0);
    const totalValueTime = completedItems.reduce((a, i) => a + i.valueAddedTime, 0);
    const defects = completedItems.filter(i => i.type === 'DEFECT').length;

    return {
      throughput: total,
      avgLeadTime: Math.round(totalLeadTime / total),
      flowEfficiency: Math.round((totalValueTime / totalLeadTime) * 100),
      defectRate: Math.round((defects / total) * 100),
      leadTimes
    };
  }, [completedItems]);
}
