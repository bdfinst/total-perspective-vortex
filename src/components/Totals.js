import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
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
  root: {
    root: {
      minWidth: 100,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: 'center',
    },
    pos: {
      marginBottom: 12,
    },
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
    { name: 'processTime', title: 'Process Time', value: totals.processTime },
    { name: 'waitTime', title: 'Wait Time', value: totals.waitTime },
    { name: 'actorTime', title: 'Actor Time', value: totals.actorTime },
    { name: 'totalTime', title: 'Total Time', value: totals.totalTime },
    { name: 'avgPCA', title: 'Average C/A', value: `${totals.avgPCA}%` },
    {
      name: 'flowEfficiency',
      title: 'Flow Efficiency',
      value: totals.flowEfficiency,
    },
  ]
  return (
    <>
      <TableContainer component={Paper}>
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
