/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react'
import { Grid, TextField, Tooltip } from '@material-ui/core'
import { HelpOutline, InputOutlined } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

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

const useStyles = makeStyles((theme) => ({
  input: {
    padding: '5 5 5 5 ',
    margin: 8,
  },
  inputClass: {
    fontSize: 40,
    color: theme.textPrimary,
  },
  errorClass: {
    textAlign: 'center',
  },
}))

export const InputProcessName = ({ node }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const [error, setError] = useState(false)
  const [className, setClassName] = useState('inputClass')

  useEffect(() => {
    console.log(node)
  })

  useEffect(() => {
    setClassName(error ? classes.errorClass : classes.inputClass)
  }, [error])

  const isValid = (value) => value.length > 0

  const getHelperText = (error) =>
    error ? 'Cannot be blank' : 'Enter a name for the process step'

  const handleBlur = (e) => {
    setError(isValid(e.target.value))
  }
  const handleChange = (e) => {
    setError(isValid(e.target.value))

    console.log(e.target.value)

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
        className={`${classes.input} ${className}`}
        id={node.id}
        label={node.data.processName}
        value={node.data.processName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={false}
        helperText="Enter a name for the process step"
        margin="dense"
        size="small"
        type="text"
        fullWidth
        required
      />
      {/* <Tooltip title={input.toolTip}>
        <HelpOutline className={classes.help} />
      </Tooltip> */}
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
