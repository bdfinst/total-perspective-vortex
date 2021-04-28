import getTableData, { getTrend } from './createData'
import teams from '../../__mocks__/teams'

describe('Geeting trend data', () => {
  it('should report a negative trend for declining performance', () => {
    const data = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    const values = data.map((i, idx) => ({ metric: i, week: idx + 1 }))
    expect(getTrend(values, 1)).toBe(-1)
  })
  it('should report a positive trend for declining performance', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const values = data.map((i, idx) => ({ metric: i, week: idx + 1 }))
    expect(getTrend(values, 1)).toBe(1)
  })
  it('should return 0 for no values', () => {
    expect(getTrend()).toBe(0)
  })
  it('should return 0 for less than 2 values', () => {
    const data = [1]
    const values = data.map((i, idx) => ({ metric: i, week: idx + 1 }))
    expect(getTrend(values)).toBe(0)
  })
})
