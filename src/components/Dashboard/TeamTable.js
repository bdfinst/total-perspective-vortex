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
  { id: 'teamName', label: 'Team', minWidth: 170 },
  { id: 'currentEpicLeadTime', label: 'Lead Time', minWidth: 100 },
  {
    id: 'epicLeadTimeTrend',
    label: 'Trend',
    minWidth: 170,
    align: 'right',
  },
]

const formatData = (data) =>
  data.map((item) => ({
    teamName: item.team.name,
    teamId: item.team.id,
    currentEpicLeadTime: item.epics.currentLeadTime,
    epicLeadTimeTrend: item.epics.leadTimeTrend,
  }))

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
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={datum.teamId}
                >
                  {columns.map((column) => {
                    const value = datum[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
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
