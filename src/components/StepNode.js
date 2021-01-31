import React, { useState } from 'react'
import { Handle } from 'react-flow-renderer'

import { useVSMDispatch } from '../components/AppContext'

const StepNode = (props) => {
  const dispatch = useVSMDispatch()
  const [node, setNode] = useState(props)

  const handleCycleTimeChange = (e) => {
    const { value } = e.target

    if (value < node.data.processTime) {
      e.target.value = node.data.processTime
    }

    handleChange(e)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setNode((prevNode) => ({
      ...prevNode,
      data: { ...prevNode.data, [name]: value },
    }))
    console.log('NODE')
    console.log(`${node.id} : ${name} : ${value}`)
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
          <div className="col-25">
            <label>Process Time:</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              min="0"
              max="9999"
              value={node.data.processTime}
              name="processTime"
              onChange={handleChange}
              onBlur={(e) => {
                dispatch({ type: 'UPDATE', node: node })
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
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
          </div>
        </div>
        <div className="row">
          <div className="col-25">
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
          </div>
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
