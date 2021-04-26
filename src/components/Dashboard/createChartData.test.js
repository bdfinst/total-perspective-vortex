import getTableData from './createData'
import teams from '../../__mocks__/teams'

describe('Generating data', () => {
  let teamList
  const weeks = 4

  beforeAll(() => {
    teamList = getTableData(weeks, teams)
  })
  it('should return data for the specified number of weeks', () => {
    console.log(teamList[0])
    expect(teamList[0].epics.leadTimes.length).toBe(weeks)
  })
})
