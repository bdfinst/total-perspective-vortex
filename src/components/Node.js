import React, { useState } from 'react'
import { Handle } from 'react-flow-renderer'
import { TextField } from '@material-ui/core'

import { useValueStream } from '../reactContext'
import InputNumber from './InputNumber'

const Node = (props) => {
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
          <InputNumber
            id="processTime"
            label="Process Time"
            inputProps={{ min: 0, max: 9999999 }}
            onChange={handleChange}
            onBlur={handleUpdate}
          />
        </div>
        <div className="row">
          <InputNumber
            id="cycleTime"
            label="Wait Time"
            inputProps={{ min: 0, max: 9999999 }}
            onChange={handleCycleTimeChange}
            onBlur={handleUpdate}
          />
        </div>
        <div className="row">
          <InputNumber
            id="pctCompleteAccurate"
            inputProps={{ min: 0, max: 100 }}
            label="% C/A"
            onChange={handleChange}
            onBlur={handleUpdate}
          />
          <div>{props.data.actors}</div>
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

export default Node
