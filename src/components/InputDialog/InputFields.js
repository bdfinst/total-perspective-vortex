/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react'
import { Grid, TextField, Tooltip } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
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
  help: {
    color: theme.palette.primary.light,
    fontSize: 'medium',
  },
  icon: {
    fontSize: 40,
    color: theme.textPrimary,
  },
}))

const helpText = {
  error: 'Cannot be blank',
  normal: 'Enter a name for the process step',
}

const getErrors = (key, value, errors) => {
  switch (key) {
    case 'processName':
      return { ...errors, [key]: value.length > 0 ? false : true }
    case 'processTime':
      return { ...errors, [key]: value >= 0 && value <= 999 ? false : true }
    case 'waitTime':
      return { ...errors, [key]: value >= 0 && value <= 999 ? false : true }
    case 'pctCompleteAccurate':
      return { ...errors, [key]: value > 0 && value <= 100 ? false : true }
    case 'actors':
      return { ...errors, [key]: value >= 0 && value <= 99 ? false : true }
    default:
      return errors
  }
}

export const InputBase = ({
  node,
  onChange,
  errors,
  propName,
  title,
  inputType,
  helpText,
  toolTip,
  autoFocus,
  required,
  cols,
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const [errorList, setErrorList] = useState(errors)
  const [nodeData, setNodeData] = useState({})
  const [helperText, setHelperText] = useState('')

  useEffect(() => {
    setNodeData(node.data)
  }, [node.data])

  useEffect(() => {
    setHelperText(errorList[propName] ? helpText.error : helpText.normal)
  }, [errorList[propName]])

  const handleBlur = (e) => {
    const value = e.target.value.trim()

    const newData = { ...nodeData, [propName]: value }

    const newErrors = getErrors(propName, value, errorList)
    setErrorList(newErrors)

    onChange(newData, errorList)
  }

  const handleChange = (e) => {
    const value = e.target.value

    const newErrors = getErrors(propName, value, errorList)
    const newData = { ...nodeData, [propName]: value }

    setErrorList(newErrors)
    setNodeData(newData)
  }

  return (
    <Grid item xs={cols}>
      <TextField
        className={classes.input}
        id={`${propName}-${node.id}`}
        label={title}
        value={nodeData[propName]}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errorList[propName]}
        helperText={helperText}
        margin="dense"
        size="small"
        type={inputType || 'text'}
        required={required || false}
        autoFocus={autoFocus || false}
      />
      {toolTip.length > 0 && (
        <Tooltip title={toolTip}>
          <HelpOutline className={classes.help} />
        </Tooltip>
      )}
    </Grid>
  )
}

export const InputProcessName = ({ node, onChange, errors }) => {
  const helpText = {
    error: 'Cannot be blank',
    normal: 'Enter a name for the process step',
  }

  return (
    <InputBase
      node={node}
      onChange={onChange}
      errors={errors}
      title="Step Name"
      propName="processName"
      inputType="text"
      helpText={helpText}
      toolTip=""
      cols={12}
      required={true}
      autoFocus={true}
    />
  )
}

export const InputProcessTime = ({ node, onChange, errors }) => {
  const helpText = {
    error: 'Must be between 0 and 999',
    normal: 'Value between 0 and 999',
  }

  const toolTip = 'The amount of time required to do the activity'

  return (
    <InputBase
      node={node}
      onChange={onChange}
      errors={errors}
      title="Work Time"
      propName="processTime"
      inputType="number"
      helpText={helpText}
      toolTip={toolTip}
      cols={6}
      required={true}
    />
  )
}

export const InputWaitTime = ({ node, onChange, errors }) => {
  const helpText = {
    error: 'Must be between 1 and 999',
    normal: 'Value between 1 and 999',
  }

  const toolTip = 'The amount of time spent before the activity is started'

  return (
    <InputBase
      node={node}
      onChange={onChange}
      errors={errors}
      title="Wait Time"
      propName="waitTime"
      inputType="number"
      helpText={helpText}
      toolTip={toolTip}
      cols={6}
    />
  )
}

export const InputAccuracy = ({ node, onChange, errors }) => {
  const helpText = {
    error: 'Must be between 1% and 100%',
    normal: 'Value between 1% and 100%',
  }

  const toolTip =
    'What % of the output from this step is accepted by the next? For example, if 20% of code reviews require rework, this should be set to 80%'

  return (
    <InputBase
      node={node}
      onChange={onChange}
      errors={errors}
      title="%C/A"
      propName="pctCompleteAccurate"
      inputType="number"
      helpText={helpText}
      toolTip={toolTip}
      cols={6}
      required={true}
    />
  )
}

export const InputActors = ({ node, onChange, errors }) => {
  const helpText = {
    error: 'Must be between 1 and 99',
    normal: 'Value between 1 and 99',
  }
  const toolTip = 'The amount of time required to do the activity'

  return (
    <InputBase
      node={node}
      onChange={onChange}
      errors={errors}
      title="People Required"
      propName="actors"
      inputType="number"
      helpText={helpText}
      toolTip={toolTip}
      cols={6}
    />
  )
}
