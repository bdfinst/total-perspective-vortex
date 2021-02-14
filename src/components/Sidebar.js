import { Button } from '@material-ui/core'
import { useStore, useZoomPanHelper } from 'react-flow-renderer'
import React from 'react'
import exportFromJSON from 'export-from-json'

import { useValueStream } from '../appContext/valueStreamContext'
import FileUpload from './FileUpload'
import Totals from './Totals'

const Sidebar = () => {
  const { reset, state } = useValueStream()

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

  const handleReset = () => {
    console.log('Calling reset')
    reset()
  }

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
      <div>
        <Button color="primary" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <div>
        <Button
          color="primary"
          onClick={() => {
            exportFromJSON({
              data: state,
              fileName: 'vsm',
              exportType: 'json',
            })
          }}
        >
          Save
        </Button>
      </div>
      <div>
        <FileUpload />
      </div>
      {state.elements.find((el) => el.selected === true) ? (
        <div>
          <Button color="primary" onClick={focusNode}>
            Focus
          </Button>
        </div>
      ) : (
        <div />
      )}
    </aside>
  )
}

export default Sidebar
