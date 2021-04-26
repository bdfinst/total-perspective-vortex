const getTrend = (values, currentValue, flatChangePctRange = 10) => {
  const average = values.reduce((a, b) => a + b) / values.length
  const trend = ((currentValue - average) / average) * 100
  if (Math.abs(trend) > flatChangePctRange) {
    return 0
  }
  return trend > 0 ? 1 : -1
}

const getEpicLeadTimes = (team, weeks) => {
  const leadTimes = []
  for (let index = 0; index < weeks; index += 1) {
    leadTimes.push({
      week: index + 1,
      leadTime: Math.floor(Math.random() * 60) + 5,
    })
  }

  const leadTimeHistory = leadTimes.map((i) => i.leadTime)

  const currentLeadTime = leadTimeHistory.pop()

  return {
    leadTimes,
    leadTimeHistory,
    currentLeadTime,
    leadTimeTrend: getTrend(leadTimeHistory, leadTimeHistory, 10),
  }
}

export default function getTableData(weeks, teams) {
  const teamData = teams.map((team) => {
    const epics = getEpicLeadTimes(team, weeks)

    return {
      team,
      epics,
    }
  })

  return teamData
}
