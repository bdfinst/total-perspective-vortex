import trend from 'trendline'

import randomRange from '../../helpers/randomRange'

export const getTrend = (
  values,
  { flatChangePctRange, minSet, maxSet } = {},
) => {
  if (!values || values.length < 2) {
    return 0
  }
  const opts = {
    flatChangePctRange: flatChangePctRange || 0,
    minimumSet: minSet || 2,
    maximumSet: maxSet || values.length,
  }

  if (values.length < opts.minimumSet) {
    return 0
  }

  const data = values.slice(opts.maximumSet * -1)
  const _trend = trend(data, 'week', 'value')

  if (Math.abs(_trend.slope) < flatChangePctRange) {
    return 0
  }

  return _trend.slope > 0 ? 1 : -1
}

const getMetricData = (min, max, weeks) => {
  const data = []
  for (let index = 0; index < weeks; index += 1) {
    data.push({
      week: index + 1,
      value: Math.floor(randomRange(min, max)),
    })
  }

  const history = data.map(i => i.value)

  const current = history.reverse()[0]

  return {
    data,
    history,
    current,
    trend: getTrend(data),
  }
}

const getEpicLeadTimes = (team, weeks) => getMetricData(10, 30, weeks)

const getStoryLeadTimes = (team, weeks) => getMetricData(4, 15, weeks)

const getDevCycleTime = (team, weeks) => getMetricData(1, 10, weeks)

const getDeliveryFrequency = (team, weeks) => getMetricData(1, 10, weeks)

export default function getTableData(weeks, teams) {
  const teamData = teams.map(team => {
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
