import { Button } from '@material-ui/core'
import React from 'react'

import { useValueStream } from '../reactContext'
import Totals from './Totals'

const Sidebar = () => {
  const { state } = useValueStream()

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.effectAllowed = 'move'
  }
  return (
    <aside>
      <div>
        <Button href="https://github.com/bdfinst/vsm-tool" color="primary">
          GitHub
        </Button>
      </div>
      <div className="description">Drag nodes to the pane on the right.</div>
      <div
        className="vsmnode input"
        onDragStart={(event) => onDragStart(event, 'stepNode')}
        draggable
      >
        Add Node
      </div>
      <Totals />
      <div>Records: {state.elements.length}</div>
    </aside>
  )
}

export default Sidebar
