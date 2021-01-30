import React, { memo, useState } from 'react'
import { Handle } from 'react-flow-renderer'

export default memo(({ data }) => {
  const useInput = ({ type, data, min, max }) => {
    const [value, setValue] = useState(data)
    const input = (
      <input
        value={value}
        min={min}
        max={max}
        onChange={(e) => setValue(e.target.value)}
        type={type}
      />
    )
    return [value, input]
  }

  const [processTime, setProcessTime] = useState(0)
  const [cycleTime, setCycleTime] = useState(0)
  const [pctCA, setPctCA] = useState(100)

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
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
              value={processTime}
              onChange={(e) => setProcessTime(e.target.value)}
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
              value={cycleTime}
              onChange={(e) => setCycleTime(e.target.value)}
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
              value={pctCA}
              onChange={(e) => setPctCA(e.target.value)}
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
})
