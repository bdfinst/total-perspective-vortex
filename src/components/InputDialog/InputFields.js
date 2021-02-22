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
}))

const getErrors = (key, value, errors) => {
  switch (key) {
    case 'processName':
      return { ...errors, processName: value.length > 0 ? false : true }
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

    console.log(newData[propName])
    console.log(e.target.value)
  }

  return (
    <Grid item xs={12}>
      <TextField
        autoFocus
        className={`${classes.input}`}
        id={node.id}
        label={title}
        value={nodeData[propName]}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errorList[propName]}
        helperText={helperText}
        margin="dense"
        size="small"
        type={inputType || 'text'}
        fullWidth
        required
      />
      {toolTip.length && (
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
    />
  )
}

// export const InputProcessName = ({ node, onChange, errors }) => {
//   const theme = useTheme()
//   const classes = useStyles(theme)

//   const [errorList, setErrorList] = useState(errors)
//   const [nodeData, setNodeData] = useState({})
//   const [helperText, setHelperText] = useState('')

//   useEffect(() => {
//     setNodeData(node.data)
//   }, [node.data])

//   useEffect(() => {
//     setHelperText(
//       errorList.processName
//         ? 'Cannot be blank'
//         : 'Enter a name for the process step',
//     )
//   }, [errorList.processName])

//   const handleBlur = (e) => {
//     const value = e.target.value.trim()

//     const newData = { ...nodeData, processName: value }

//     const newErrors = getErrors('processName', value, errorList)
//     setErrorList(newErrors)
//     console.log(newErrors)
//     console.log(errorList)

//     onChange(newData, errorList)
//   }

//   const handleChange = (e) => {
//     const value = e.target.value

//     const newErrors = getErrors('processName', value, errorList)
//     const newData = { ...nodeData, processName: value }

//     setErrorList(newErrors)
//     setNodeData(newData)

//     console.log(newData.processName)
//     console.log(e.target.value)
//   }

//   return (
//     <Grid item xs={12}>
//       <TextField
//         autoFocus
//         className={`${classes.input}`}
//         id={node.id}
//         label={node.data.processName}
//         value={nodeData.processName}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         error={errorList.processName}
//         helperText={helperText}
//         margin="dense"
//         size="small"
//         type="text"
//         fullWidth
//         required
//       />
//       {/* <Tooltip title={input.toolTip}>
//         <HelpOutline className={classes.help} />
//       </Tooltip> */}
//     </Grid>
//   )
// }

export const InputProcessTime = ({ node, onChange, errors }) => {
  return (
    <Grid item xs={6}>
      <div>ProcessTime</div>
    </Grid>
  )
}

export const InputWaitTime = ({ node, onChange, errors }) => {
  return (
    <Grid item xs={6}>
      <div>WaitTime</div>
    </Grid>
  )
}

export const InputAccuracy = ({ node, onChange, errors }) => {
  return (
    <Grid item xs={6}>
      <div>Accuracy</div>
    </Grid>
  )
}

export const InputActors = ({ node, onChange, errors }) => {
  return (
    <Grid item xs={6}>
      <div>Actors</div>
    </Grid>
  )
}
