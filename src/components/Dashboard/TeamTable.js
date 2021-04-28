import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TrendingDownIcon from '@material-ui/icons/TrendingDown'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
})

const rowsPerPageOptions = [5, 10, 20, 50]

const columns = [
  { id: 'teamName', label: 'Team', minWidth: 50, span: 1, align: 'left' },
  {
    id: 'currentEpicLeadTime',
    trend: 'epicLeadTimeTrend',
    label: 'Lead Time',
    minWidth: 50,
    span: 1,
    align: 'center',
  },
]

const formatData = (data) =>
  data.map((item) => ({
    teamName: item.team.name,
    teamId: item.team.id,
    currentEpicLeadTime: item.epics.currentLeadTime,
    epicLeadTimeTrend: item.epics.leadTimeTrend,
  }))

const Metric = ({ value, trend, align }) => {
  let TrendIcon

  if (trend) {
    switch (trend) {
      case 1:
        TrendIcon = TrendingUpIcon
        break
      case -1:
        TrendIcon = TrendingDownIcon
        break
      default:
        TrendIcon = TrendingFlatIcon
        break
    }
  }

  return (
    <>
      <TableCell width="20%" align={align}>
        {value}
        {trend && <TrendIcon />}
      </TableCell>
    </>
  )
}

export default function TeamTable({ data }) {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {formatData(data)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((datum) => (
                <TableRow hover tabIndex={-1} key={datum.teamId}>
                  {columns.map((column) => {
                    const trend = datum[column.trend]
                      ? datum[column.trend]
                      : undefined
                    const value = datum[column.id]
                    return (
                      <Metric
                        value={value}
                        trend={trend}
                        key={column.id}
                        align={column.align}
                      />
                    )
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
