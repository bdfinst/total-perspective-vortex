import React, { useState } from 'react'
import { Handle } from 'react-flow-renderer'
import { TextField } from '@material-ui/core'

import { useValueStream } from '../reactContext'

const StepNode = (props) => {
  const { changeNodeValues } = useValueStream()
  const [node, setNode] = useState(props)

  const updateNode = (id, value) => {
    setNode((prevNode) => ({
      ...prevNode,
      data: { ...prevNode.data, [id]: value },
    }))
  }
  const handleCycleTimeChange = (e) => {
    const { value } = e.target

    if (Number(value) < Number(node.data.processTime)) {
      e.target.value = node.data.processTime
    }
    handleChange(e)
  }

  const handleChange = (e) => {
    const { id, value } = e.target

    updateNode(id, value)
  }

  const handleUpdate = (e) => {
    changeNodeValues(node.id, node.data)
  }

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        onConnect={(params) => {
          console.log('handle onConnect', params)
        }}
      />
      <div className="node-container">
        <div className="row">
          <TextField
            label="Process Time"
            id="processTime"
            defaultValue={props.data.processTime}
            variant="outlined"
            size="small"
            inputProps={{ min: 0, max: 9999 }}
            type="number"
            margin="dense"
            onChange={handleChange}
            onBlur={handleUpdate}
          />
        </div>
        <div className="row">
          <TextField
            label="Total Time"
            id="cycleTime"
            defaultValue={props.data.cycleTime}
            variant="outlined"
            size="small"
            inputProps={{ min: 0, max: 9999 }}
            type="number"
            margin="dense"
            onChange={handleCycleTimeChange}
            onBlur={handleUpdate}
          />
        </div>
        <div className="row">
          <TextField
            label="% C/A"
            id="pctCompleteAccurate"
            defaultValue={props.data.pctCompleteAccurate}
            variant="outlined"
            size="small"
            inputProps={{ min: 0, max: 100 }}
            type="number"
            margin="dense"
            onChange={handleChange}
            onBlur={handleUpdate}
          />
        </div>
      </div>

      <Handle
        type="source"
        position="right"
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{ background: '#555' }}
      />
    </>
  )
}

export default StepNode
