import { TextField } from '@material-ui/core'
import React from 'react'

const InputNumber = (props) => {
  return (
    <TextField
      label={props.label}
      id={props.id}
      defaultValue={props.defaultValue}
      inputProps={props.inputProps}
      variant="outlined"
      size="small"
      type="number"
      margin="dense"
      onChange={props.handleChange}
      onBlur={props.handleUpdate}
    />
  )
}

export default InputNumber
