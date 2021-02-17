import { Grid } from '@material-ui/core'
import React from 'react'

import { GitHubButton } from './Buttons'
import AddNode from './AddNode'
import Controls from './Controls'
import Totals from './Totals'

const Sidebar = () => {
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
              <AddNode />
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
