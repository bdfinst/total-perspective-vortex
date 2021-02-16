import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useStore, useZoomPanHelper } from 'react-flow-renderer'
import exportFromJSON from 'export-from-json'

import { GitHubButton } from './Buttons'
import { useValueStream } from '../appContext/valueStreamContext'
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
  const { reset, state } = useValueStream()
  const [isNodeSelected, setIsNodeSelected] = useState(false)
  const theme = useTheme()
  const classes = useStyles(theme)

  useEffect(() => {
    setIsNodeSelected(
      state.elements.filter((el) => el.selected === true).length > 0,
    )
  }, [state.elements])

  const { setCenter } = useZoomPanHelper()
  const store = useStore()

  const focusNode = () => {
    const { nodes } = store.getState()
    const node = nodes.find((el) => el.selected === true)

    if (node) {
      const x = node.__rf.position.x + node.__rf.width / 2
      const y = node.__rf.position.y + node.__rf.height / 2
      const zoom = 1.85

      setCenter(x, y, zoom)
    }
  }

  const handleReset = () => reset()

  const handleExport = () => {
    exportFromJSON({
      data: state,
      fileName: 'vsm',
      exportType: 'json',
    })
  }

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
              <Controls
                handleReset={handleReset}
                focusNode={focusNode}
                enabled={isNodeSelected}
                handleExport={handleExport}
              />
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
