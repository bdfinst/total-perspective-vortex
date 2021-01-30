import React, { useState } from 'react'

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
  console.log(value)
  return [value, input]
}

export default useInput
