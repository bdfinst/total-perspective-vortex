import trend from 'trendline'
import randomRange from '../../helpers/randomRange'

export const getTrend = (values, flatChangePctRange = 1) => {
  const _trend = trend(values, 'week', 'metric')

  if (Math.abs(_trend.slope) < flatChangePctRange) {
    return 0
  }

  return _trend.slope > 0 ? 1 : -1
}

const getMetricData = (min, max, weeks) => {
  const metrics = []
  for (let index = 0; index < weeks; index += 1) {
    metrics.push({
      week: index + 1,
      metric: Math.floor(randomRange(min, max)),
    })
  }

  const metricHistory = metrics.map((i) => i.metric)

  const currentMetric = metricHistory.reverse()[0]

  return {
    metrics,
    metricHistory,
    currentMetric,
    metricTrend: getTrend(metrics, 5),
  }
}

const getEpicLeadTimes = (team, weeks) => {
  const times = getMetricData(10, 30, weeks)
  return {
    leadTimes: times.metrics,
    leadTimeHistory: times.metricHistory,
    currentLeadTime: times.metricHistory,
    leadTimeTrend: times.metricTrend,
  }
}

const getStoryLeadTimes = (team, weeks) => {
  const times = getMetricData(4, 15, weeks)
  return {
    leadTimes: times.metrics,
    leadTimeHistory: times.metricHistory,
    currentLeadTime: times.metricHistory,
    leadTimeTrend: times.metricTrend,
  }
}

const getDevCycleTime = (team, weeks) => {
  const times = getMetricData(1, 10, weeks)
  return {
    cycleTimes: times.metrics,
    cycleTimeHistory: times.metricHistory,
    currentCycleTime: times.metricHistory,
    cycleTimeTrend: times.metricTrend,
  }
}

const getDeliveryFrequency = (team, weeks) => {
  const times = getMetricData(1, 10, weeks)
  return {
    deliveryFrequencies: times.metrics,
    deliveryFrequencyHistory: times.metricHistory,
    currentDeliveryFrequency: times.metricHistory,
    deliveryFrequencyTrend: times.metricTrend,
  }
}

export default function getTableData(weeks, teams) {
  const teamData = teams.map((team) => {
    const epics = getEpicLeadTimes(team, weeks)
    const stories = getStoryLeadTimes(team, weeks)
    const devCycleTimes = getDevCycleTime(team, weeks)
    const deliveryFrequency = getDeliveryFrequency(team, weeks)

    return {
      team,
      epics,
      stories,
      devCycleTimes,
      deliveryFrequency,
    }
  })

  return teamData
}
