import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '20ch',
      border: 0,
      borderRadius: 3,
    },
  },
}))

const InputText = (props) => {
  const classes = useStyles()
  const { id, label, onChange, onBlur, inputProps, name } = props

  return (
    <>
      <TextField
        className={classes.root}
        id={id}
        name={name}
        label={label}
        variant="outlined"
        size="small"
        type="text"
        margin="dense"
        inputProps={inputProps}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  )
}

const InputNumber = (props) => {
  const classes = useStyles()
  const { id, label, onChange, onBlur, inputProps, name } = props

  return (
    <>
      <TextField
        className={classes.root}
        id={id}
        name={name}
        label={label}
        variant="outlined"
        size="small"
        margin="dense"
        type="number"
        defaultValue={0}
        inputProps={inputProps}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  )
}

export { InputText, InputNumber }
