import React, { memo, useState } from 'react'
import { Handle } from 'react-flow-renderer'

import { useVSMDispatch, useVSMState } from '../components/AppContext'

const StepNode = (props) => {
  const dispatch = useVSMDispatch()
  const [node, setNode] = useState(props)

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
              value={node.data.cycleTime || 0}
              onChange={(e) => console.log(e.target.value)}
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
              value={node.data.pctCompleteAccurate || 100}
              onChange={(e) => console.log(e.target.value)}
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
