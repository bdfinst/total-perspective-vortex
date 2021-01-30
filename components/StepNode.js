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

  const [actorCount, actorCountInput] = useInput({
    type: 'number',
    data: data.processTime,
    min: '0',
    max: '9999',
  })

  const [processTime, processTimeInput] = useInput({
    type: 'number',
    data: data.processTime,
    min: '0',
    max: '9999',
  })

  const [cycleTime, cycleTimeInput] = useInput({
    type: 'number',
    data: data.cycleTime,
    min: '0',
    max: '9999',
  })

  const [pctCompleteAccurate, pctCompleteAccurateInput] = useInput({
    type: 'number',
    data: data.pctCompleteAccurate,
    min: '0',
    max: '100',
  })

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <table>
        <tr>
          <td>Actors:</td>
          <td>{actorCountInput}</td>
        </tr>
        <tr>
          <td>Process Time:</td>
          <td>{processTimeInput}</td>
        </tr>
        <tr>
          <td>Total Time:</td>
          <td>{cycleTimeInput}</td>
        </tr>
        <tr>
          <td>%C/A:</td>
          <td>{pctCompleteAccurateInput}%</td>
        </tr>
      </table>

      {/* <input
        className="nodrag"
        type="color"
        onChange={data.onChange}
        defaultValue={data.color}
      /> */}
      <Handle
        type="source"
        position="right"
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{ background: '#555' }}
      />
    </>
  )
})
