import React, { useState } from 'react'
import { Handle } from 'react-flow-renderer'
import { TextField } from '@material-ui/core'

import { useVSMDispatch } from '../components/AppContext'

const StepNode = (props) => {
  const dispatch = useVSMDispatch()
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

    // if (node.data.processTime > node.data.cycleTime) {
    //   updateNode('cycleTime', node.data.processTime)
    // }

    updateNode(id, value)
  }

  const handleUpdate = (e) => {
    console.log('NODE')
    console.log(node)
    console.log(node.data.processTime > node.data.cycleTime)

    dispatch({ type: 'UPDATE', node: node })
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
            defaultValue={node.data.processTime}
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
            defaultValue={node.data.cycleTime}
            variant="outlined"
            size="small"
            inputProps={{ min: 0, max: 9999 }}
            type="number"
            margin="dense"
            onChange={handleCycleTimeChange}
            onBlur={handleUpdate}
          />
          {/* <div className="col-25">
            <label>Total Time:</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              min="0"
              max="9999"
              value={node.data.cycleTime}
              name="cycleTime"
              onChange={handleCycleTimeChange}
              onBlur={(e) => {
                dispatch({ type: 'UPDATE', node: node })
              }}
            />
          </div> */}
        </div>
        <div className="row">
          <TextField
            label="% C/A"
            id="pctCompleteAccurate"
            defaultValue={node.data.pctCompleteAccurate}
            variant="outlined"
            size="small"
            inputProps={{ min: 0, max: 100 }}
            type="number"
            margin="dense"
            onChange={handleChange}
            onBlur={handleUpdate}
          />

          {/* <div className="col-25">
            <label>% C/A:</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              min="0"
              max="100"
              value={node.data.pctCompleteAccurate}
              name="pctCompleteAccurate"
              onChange={handleChange}
              onBlur={(e) => {
                dispatch({ type: 'UPDATE', node: node })
              }}
            />
            %
          </div> */}
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
