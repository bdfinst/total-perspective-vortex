import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30px',
      border: 0,
      borderRadius: 3,
    },
  },
}))

const NumberInput = (props) => {
  const classes = useStyles()
  const { id, label, onChange, onBlur, inputProps } = props

  return (
    <>
      <TextField
        className={classes.root}
        id={id}
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

export default NumberInput
