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
    fontSize: 'small',
  },
}))

const InputBlock = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { state, toggleNodeSelect, changeNodeValues } = useValueStream()
  const [inputs, setInputs] = useState(inputFieldDefs)

  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState(false)

  const node = state.elements.find((el) => isNode(el) && el.selected)

  const handleClose = () => {
    setSubmitted(false)
    setOpen(false)
    toggleNodeSelect({ node })
  }

  useEffect(() => {
    if (node) {
      setOpen(true)
      console.log(node)
      console.log(convertNodeToInputs())
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

  const convertNodeToInputs = () => {
    const newInputs = [...inputs]

    for (const key in node.data) {
      const index = inputs.findIndex((item) => {
        return item.id === key
      })
      const input = inputs[index]

      newInputs[index] = {
        ...input,
        value: node.data[key],
      }
    }
    setInputs(newInputs)

    console.log(newInputs)
  }
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
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  xs={6}
                >
                  <Grid item key={`field_${input.id}`} xs={12}>
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
