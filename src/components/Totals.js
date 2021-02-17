import React, { useEffect, useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { getNodeSums } from '../helpers'
import { useValueStream } from '../appContext/valueStreamContext'

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: 200,
  },

  title: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
  },
}))

const Totals = () => {
  const { state } = useValueStream()
  const [totals, setTotals] = useState(getNodeSums(state.elements))
  const theme = useTheme()
  const classes = useStyles(theme)

  useEffect(() => {
    const total = getNodeSums(state.elements)
    setTotals(total)
  }, [state.elements])

  const rows = [
    { name: 'processTime', title: 'Work Time', value: totals.processTime },
    { name: 'waitTime', title: 'Wait Time', value: totals.waitTime },
    {
      name: 'averageActors',
      title: 'Average Actors',
      value: totals.averageActors,
    },
    { name: 'actorTime', title: 'Actor Time', value: totals.actorTime },
    { name: 'totalTime', title: 'Total Time', value: totals.totalTime },
    { name: 'avgPCA', title: 'Average C/A', value: `${totals.avgPCA}%` },
    {
      name: 'flowEfficiency',
      title: 'Flow Efficiency',
      value: `${totals.flowEfficiency}%`,
    },
  ]
  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        className={classes.tableContainer}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                <Typography className={classes.title} gutterBottom>
                  Totals
                </Typography>
              </TableCell>
            </TableRow>
            {rows.map((row) => (
              <TableRow key={row.name} data-testid={row.name}>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Totals
