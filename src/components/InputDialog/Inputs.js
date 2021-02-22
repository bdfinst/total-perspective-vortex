/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from 'react'
import { Grid, TextField } from '@material-ui/core'

const x = {
  id: 'processName',
  label: 'Process Name',
  value: '',
  error: false,
  helperText: 'Enter a name for the process step',
  getHelperText: (error) =>
    error ? 'Cannot be blank' : 'Enter a name for the process step',
  isValid: (value) => value.length > 0,
}

export const InputProcessName = ({ className, node }) => {
  useEffect(() => {
    console.log(node)
  })

  const isValid = (value) => value.length > 0

  const getHelperText = (error) =>
    error ? 'Cannot be blank' : 'Enter a name for the process step'

  const handleChange = (event) => {
    console.log(event)

    // const input = inputs[index]

    // newInputs[index] = {
    //   ...input,
    //   value: event.target.value.trim(),
    //   error: !isValid,
    //   helperText: input.getHelperText(!isValid),
    // }
    // setInputs(newInputs)
  }

  return (
    <Grid item xs={12}>
      <TextField
        autoFocus
        className={className}
        id={node.id}
        label={node.data.processName}
        value={node.data.processName}
        onChange={handleChange}
        error={false}
        helperText="Enter a name for the process step"
        margin="dense"
        size="small"
        type="text"
        fullWidth
        required
      />
    </Grid>
  )
}

export const InputProcessTime = ({ className, node }) => {
  return (
    <Grid item xs={6}>
      <div>ProcessTime</div>
    </Grid>
  )
}

export const InputWaitTime = ({ className, node }) => {
  return (
    <Grid item xs={6}>
      <div>WaitTime</div>
    </Grid>
  )
}

export const InputAccuracy = ({ className, node }) => {
  return (
    <Grid item xs={6}>
      <div>Accuracy</div>
    </Grid>
  )
}

export const InputActors = ({ className, node }) => {
  return (
    <Grid item xs={6}>
      <div>Actors</div>
    </Grid>
  )
}
