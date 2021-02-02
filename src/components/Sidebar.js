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
      <div className="description">Drag nodes to the pane on the right.</div>
      <div
        className="vsmnode input"
        onDragStart={(event) => onDragStart(event, 'stepNode')}
        draggable
      >
        Step Node
      </div>
      <Totals />
      <div>Records: {state.elements.length}</div>
    </aside>
  )
}

export default Sidebar
