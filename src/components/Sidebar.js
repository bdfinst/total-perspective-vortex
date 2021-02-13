import { Button } from '@material-ui/core'
import React from 'react'

import Totals from './Totals'

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.effectAllowed = 'move'
  }
  return (
    <aside>
      <div>
        <Button
          href="https://github.com/bdfinst/vsm-tool"
          target="_blank"
          rel="noreferrer"
          color="primary"
        >
          GitHub
        </Button>
      </div>
      <div className="description">Drag nodes to the pane on the right.</div>
      <div
        className="vsmnode input"
        onDragStart={(event) => onDragStart(event, 'customNode')}
        draggable
      >
        Add Node
      </div>
      <Totals />
    </aside>
  )
}

export default Sidebar
