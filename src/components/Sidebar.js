import React, { useEffect, useState } from 'react'
import { Grid, Paper } from '@material-ui/core'
import { useStore, useZoomPanHelper } from 'react-flow-renderer'
import { useTheme } from '@material-ui/core/styles'
import exportFromJSON from 'export-from-json'

import { useValueStream } from '../appContext/valueStreamContext'
import AddNode from './AddNode'
import FileUpload from './Buttons/FileUpload'
import FocusButton from './Buttons/FocusButton'
import GitHubButton from './Buttons/GitHubButton'
import ResetButton from './Buttons/ResetButton'
import SaveButton from './Buttons/SaveButton'
import Totals from './Totals'

const Sidebar = () => {
  const { reset, state } = useValueStream()
  const [isNodeSelected, setIsNodeSelected] = useState(false)
  const theme = useTheme()

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
      console.log(node)
      const x = node.__rf.position.x + node.__rf.width / 2
      const y = node.__rf.position.y + node.__rf.height / 2
      const zoom = 1.85
      console.log(`Node: X: ${x} Y: ${y}`)

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
            <Grid item xs="12">
              <Totals />
            </Grid>
            <Grid item xs="12">
              <AddNode />
            </Grid>
            <Grid item container xs="12" direction="row" spacing="2">
              <Grid item xs>
                <FocusButton onClick={focusNode} enabled={isNodeSelected} />
              </Grid>
              <Grid item xs>
                <SaveButton onClick={handleExport} />
              </Grid>
              <Grid item xs>
                <FileUpload />
              </Grid>
              <Grid item xs>
                <ResetButton onClick={handleReset} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs="12">
          <GitHubButton href="https://github.com/bdfinst/vsm-tool" />
        </Grid>
      </Grid>
    </aside>
  )
}

export default Sidebar
