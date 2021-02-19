import React, { useEffect, useState } from 'react'
import ReactFlow, {
  MiniMap,
  ReactFlowProvider,
  isNode,
} from 'react-flow-renderer'
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { InputNumber, InputText } from './Inputs'
import { useValueStream } from '../appContext/valueStreamContext'

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
  const [helpOpen, setHelpOpen] = useState(false)

  const { state, toggleNodeSelect } = useValueStream()

  const onElementClick = (event, element) => {
    if (isNode(element)) {
      toggleNodeSelect({ node: element })
    }
  }

  const node = state.elements.find((el) => isNode(el) && el.selected)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (node) {
      setOpen(true)
    }
  }, [node, open])

  const handleNumberChange = (e) => {
    const { name, value } = e.target

    console.log(name, Number(value))
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    console.log(name, value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    toggleNodeSelect({ node })
  }

  const inputFields = [
    {
      name: 'processTime',
      label: 'Work Time',
      max: 999,
      helpText: 'The amount of time required to do the activity',
      onChange: handleNumberChange,
    },
    {
      name: 'waitTime',
      label: 'Wait Time',
      helpText: 'The amount of time spent before the activity is started',
      max: 999,
      onChange: handleNumberChange,
    },
    {
      name: 'actors',
      label: 'People',
      helpText:
        'The number of people engaged in the activity. For automation, this should be 0',
      max: 999,
      onChange: handleNumberChange,
    },
    {
      name: 'pctCompleteAccurate',
      label: '% C/A',
      helpText:
        'What % of the output from this step is accepted by the next? For example, if 20% of code reviews require rework, this should be set to 80%',
      max: 100,
      onChange: handleChange,
    },
  ]

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
                id="description"
                name="description"
                label="Description"
                margin="dense"
                size="small"
                type="text"
                fullWidth
              />
            </Grid>
            {inputFields.map((field) => (
              <Grid
                item
                container
                id={`gic_${field.name}`}
                direction="row"
                justify="space-between"
                alignItems="center"
                xs={6}
              >
                <Grid item id={`gitf_${field.name}`} xs={11}>
                  <TextField
                    id={`${field.name}`}
                    name={field.name}
                    label={field.label}
                    inputProps={{ min: 0, max: field.max }}
                    className={classes.input}
                    size="small"
                    margin="dense"
                    type="number"
                    fullWidth
                    // onChange={field.onChange}
                  />
                </Grid>
                <Grid item id={`gitt_${field.name}`} xs={1}>
                  <Tooltip title={field.helpText}>
                    <HelpOutline className={classes.help} />
                  </Tooltip>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InputBlock
