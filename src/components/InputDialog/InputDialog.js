import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Tooltip,
} from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import { isNode } from 'react-flow-renderer'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { useValueStream } from '../../appContext/valueStreamContext'
import inputFieldDefs from './fieldDefs'

const useStyles = makeStyles((theme) => ({
  input: {
    padding: '5 5 5 5 ',
    margin: 8,
  },
  help: {
    color: theme.palette.primary.light,
  },
}))

const InputBlock = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [data, setData] = useState({})
  const [open, setOpen] = useState(false)
  const { state, toggleNodeSelect, changeNodeValues } = useValueStream()
  const [errors, setErrors] = useState(false)
  const [inputs, setInputs] = useState(inputFieldDefs)
  const [submitted, setSubmitted] = useState(false)

  const node = state.elements.find((el) => isNode(el) && el.selected)

  const handleClose = () => {
    setSubmitted(false)
    setOpen(false)
    toggleNodeSelect({ node })
  }

  useEffect(() => {
    if (node) {
      setOpen(true)
    }
  }, [node, open])

  useEffect(() => {
    if (submitted) handleClose()
  }, [submitted])

  useEffect(() => {
    inputs.map((i) => {
      if (i.error) {
        console.log(i.label, i.helperText)
      }
    })
  }, [errors, inputs])

  const handleSubmit = (event) => {
    if (event) event.preventDefault()
    setErrors(false)

    const newInputs = inputs.map((input) => {
      const isValid = input.isValid(input.value)

      if (!isValid) setErrors(true)

      return {
        ...input,
        error: !isValid,
        helperText: input.getHelperText(!isValid),
      }
    })

    setInputs(newInputs)
    if (!errors) {
      const data = {}
      newInputs.forEach((input) => {
        data[input.id] = isNaN(input.value) ? input.value : Number(input.value)
      })

      changeNodeValues({ node: node, data: data })
      setSubmitted(true)
    }
  }

  const handleChange = (event) => {
    const newInputs = [...inputs]
    const index = inputs.findIndex((item) => {
      return item.id === event.target.id
    })

    const input = inputs[index]
    const isValid = input.isValid(event.target.value)

    newInputs[index] = {
      ...input,
      value: event.target.value.trim(),
      error: !isValid,
      helperText: input.getHelperText(!isValid),
    }
    setInputs(newInputs)
  }

  const handleFieldUpdate = (value, field) => {
    setData({ ...data, [field]: value })
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Process</DialogTitle>
      <DialogContent>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={12}>
              <TextField
                autoFocus
                className={classes.input}
                id={inputs[0].id}
                label={inputs[0].label}
                placeholder={inputs[0].placeholder}
                value={inputs[0].value}
                onChange={handleChange}
                error={inputs[0].error}
                helperText={inputs[0].helperText}
                margin="dense"
                size="small"
                type="text"
                fullWidth
                required
              />
            </Grid>
            {inputs
              .filter((input) => input.id !== 'processName')
              .map((input) => (
                <Grid
                  item
                  key={`gi_${input.id}`}
                  container
                  key={`gic_${input.id}`}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  xs={6}
                >
                  <Grid item key={`gitf_${input.id}`} xs={11}>
                    <TextField
                      id={input.id}
                      label={input.label}
                      placeholder={input.placeholder}
                      value={Number(input.value)}
                      onChange={handleChange}
                      error={input.error}
                      helperText={input.helperText}
                      type="number"
                      size="small"
                      margin="dense"
                      required
                    />
                  </Grid>
                  <Grid item key={`gitt_${input.id}`} xs={1}>
                    <Tooltip title={input.toolTip}>
                      <HelpOutline className={classes.help} />
                    </Tooltip>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InputBlock
