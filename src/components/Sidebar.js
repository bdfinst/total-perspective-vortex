import { Button } from '@material-ui/core'
import React from 'react'
import exportFromJSON from 'export-from-json'

import { useValueStream } from '../appContext/valueStreamContext'
import FileUpload from './FileUpload'
import Totals from './Totals'

const Sidebar = () => {
  const { reset, state } = useValueStream()

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
    </aside>
  )
}

export default Sidebar
