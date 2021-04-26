const teamNames = [
  'Maridun',
  'Mon Cala',
  'Moraband',
  'Mortis',
  'Mustafar',
  'Mygeeto',
  'Naboo',
  'Nal Hutta',
  'Nevarro',
  'Numidian Prime',
  'Onderon',
  'Ord Mantell',
  'Pasaana',
  'Pillio',
  'Polis Massa',
  'Rishi',
  'Rodia',
  'Rugosa',
  'Ruusan',
  'Ryloth',
  'Saleucami',
  'Savareen',
  'Scarif',
  'Serenno',
  'Shili',
  'Sissubo',
  'Skako Minor',
  'Sorgan',
  'Starkiller Base',
  'Subterrel',
  'Sullust',
  'Takodana',
  'Tatooine',
  'Teth',
  'Toydaria',
  'Trandosha',
  'Umbara',
  'Utapau',
  'Vardos',
  'Wobani',
  'Wrea',
  'Yavin 4',
  'Zeffo',
  'Zygerria',
]

const getLeadtime = (team, weeks) => {
  const init = []
  for (let index = 0; index < weeks; index += 1) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map((el) => {
    const leadTime = Math.floor(Math.random() * 60) + 5

    return {
      week: `Week ${el.weekNbr}`,
      leadTime,
    }
  })
}

const getTrend = (values, currentValue, median = 10) => {
  const average = values.reduce((a, b) => a + b) / values.length
  const trend = ((currentValue - average) / average) * 100
  if (Math.abs(trend) > median) {
    return 0
  }
  return trend > 0 ? 1 : -1
}

export default function getChartData(weeks) {
  const teamData = teamNames.map((teamName, idx) => {
    const leadTimes = getLeadtime(teamName, weeks).map((i) => i.leadTime)
    const currentLeadTime = leadTimes.pop()
    return {
      teamName,
      teamId: idx,
      leadTime: currentLeadTime,
      leadTimeTrend: getTrend(leadTimes, currentLeadTime, 10),
    }
  })

  return teamData
  // return [
  //   {
  //     team,
  //     teamId,
  //     leadTime,
  //     devCycleTime,
  //     commitRate,
  //     deployRate,
  //     defectRate,
  //     mttr,
  //     changeFailRate,
  //   },
  // ]
}
