import { Grid } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

import { GitHubButton } from './Buttons'
import AddNode from './AddNode'
import Controls from './Controls'
import Totals from './Totals'

const useStyles = makeStyles((theme) => ({
  root: {
    '&.Mui-disabled': {
      pointerEvents: 'auto',
    },
  },
}))

const Sidebar = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <aside>
      <Grid
        container
        spacing={2}
        direction="column"
        justify="space-evenly"
        alignItems="stretch"
      >
        <Grid item>
          <Grid
            spacing={2}
            item
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Totals />
            </Grid>
            <Grid item xs={12}>
              <AddNode />
            </Grid>
            <Grid item container xs={12} direction="row" spacing={2}>
              <Controls />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <GitHubButton />
        </Grid>
      </Grid>
    </aside>
  )
}

export default Sidebar
