/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react'
import { Grid, TextField, Tooltip } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

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

const getFieldDefs = (key) => {
  switch (key) {
    case 'processName':
      return {
        title: 'Step Name',
        type: 'string',
        toolTip: '',
        gridCols: 12,
        required: true,
        autoFocus: true,
        helpText: {
          error: 'Cannot be blank',
          normal: 'Enter a name for the process step',
        },
        isError: (value) => (value.length > 0 ? false : true),
      }
    case 'processTime':
      return {
        title: 'Work Time',
        type: 'number',
        gridCols: 6,
        required: false,
        autoFocus: false,
        toolTip: 'The amount of time required to do the activity',
        helpText: {
          error: 'Must be between 0 and 999',
          normal: 'Value between 0 and 999',
        },
        isError: (value) => (value >= 0 && value <= 999 ? false : true),
      }
    default:
      return {}
  }
}

const getErrors = (key, value, errors) => {
  return { ...errors, [key]: getFieldDefs(key).isError(value) }
}

export const InputBase = ({
  node,
  onChange,
  // onBlur,
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
  const [fieldValue, setFieldValue] = useState('')

  useEffect(() => {
    setFieldValue(node.data[propName])
  }, [node.data[propName]])

  useEffect(() => {
    setHelperText(errorList[propName] ? helpText.error : helpText.normal)
  }, [errorList[propName]])

  const update = (e) => {
    const value = e.target.value.trim()
    setFieldValue(value)

    const newErrors = getErrors(propName, value, errorList)
    setErrorList(newErrors)

    return value
  }
  // const handleBlur = (e) => {
  //   const value = update(e)

  //   console.log(`Blur ${propName} : ${value}`)

  //   onBlur(value, errorList, propName)
  // }

  const handleChange = (e) => {
    const value = e.target.value.trim()
    setFieldValue(value)

    const newErrors = getErrors(propName, value, errorList)
    setErrorList(newErrors)

    console.log(`Change ${propName} : ${fieldValue}`)

    onChange(fieldValue, errorList, propName)
  }

  return (
    <Grid item xs={cols}>
      <TextField
        className={classes.input}
        id={`${propName}-${node.id}`}
        label={title}
        value={nodeData[propName] || ''}
        onChange={handleChange}
        // onBlur={handleBlur}
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

export const InputValue = ({ node, onChange, errors, propName }) => {
  return (
    <InputBase
      node={node}
      onChange={onChange}
      // onBlur={onBlur}
      errors={errors}
      title={getFieldDefs(propName).title}
      propName={propName}
      inputType={getFieldDefs(propName).type}
      helpText={getFieldDefs(propName).helpText}
      toolTip={getFieldDefs(propName).toolTip}
      cols={getFieldDefs(propName).gridCols}
      required={getFieldDefs(propName).required}
      autoFocus={getFieldDefs(propName).autoFocus || false}
    />
  )
}

export const InputProcessName = ({ node, onChange, onBlur, errors }) => {
  const helpText = {
    error: 'Cannot be blank',
    normal: 'Enter a name for the process step',
  }

  return (
    <InputBase
      node={node}
      onChange={onChange}
      onBlur={onBlur}
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

export const InputProcessTime = ({ node, onChange, onBlur, errors }) => {
  const helpText = {
    error: 'Must be between 0 and 999',
    normal: 'Value between 0 and 999',
  }

  const toolTip = 'The amount of time required to do the activity'

  return (
    <InputBase
      node={node}
      onChange={onChange}
      onBlur={onBlur}
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

export const InputWaitTime = ({ node, onChange, onBlur, errors }) => {
  const helpText = {
    error: 'Must be between 1 and 999',
    normal: 'Value between 1 and 999',
  }

  const toolTip = 'The amount of time spent before the activity is started'

  return (
    <InputBase
      node={node}
      onChange={onChange}
      onBlur={onBlur}
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

export const InputAccuracy = ({ node, onChange, onBlur, errors }) => {
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
      onBlur={onBlur}
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

export const InputActors = ({ node, onChange, onBlur, errors }) => {
  const helpText = {
    error: 'Must be between 1 and 99',
    normal: 'Value between 1 and 99',
  }
  const toolTip = 'The amount of time required to do the activity'

  return (
    <InputBase
      node={node}
      onChange={onChange}
      onBlur={onBlur}
      errors={errors}
      title="People Required"
      propName="people"
      inputType="number"
      helpText={helpText}
      toolTip={toolTip}
      cols={6}
    />
  )
}
