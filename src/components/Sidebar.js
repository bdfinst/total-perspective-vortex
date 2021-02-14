import React, { useEffect, useState } from 'react'
import { ButtonGroup } from '@material-ui/core'
import { useStore, useZoomPanHelper } from 'react-flow-renderer'
import { useTheme } from '@material-ui/core/styles'
import exportFromJSON from 'export-from-json'

import { useValueStream } from '../appContext/valueStreamContext'
import AddNode from './AddNode'
import FileUpload from './FileUpload'
import FocusButton from './FocusButton'
import GitHubButton from './GitHubButton'
import ResetButton from './ResetButton'
import SaveButton from './SaveButton'
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
      <GitHubButton href="https://github.com/bdfinst/vsm-tool" />
      <AddNode />
      <Totals />
      <FocusButton onClick={focusNode} enabled={isNodeSelected} />

      <ButtonGroup>
        <SaveButton onClick={handleExport} />
        <FileUpload />
      </ButtonGroup>
      <ResetButton onClick={handleReset} />
    </aside>
  )
}

export default Sidebar
