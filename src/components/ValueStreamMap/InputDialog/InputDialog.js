/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
} from '@material-ui/core'
import { HelpOutline, InputOutlined } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { IconButtonStyled } from '../Buttons'
import { defaultNodeData } from '../../../helpers'
import { fieldConfigs, getFieldConfig } from './formConfigs'
import { useValueStream } from '../valueStreamContext'

const useStyles = makeStyles((theme) => ({
  input: {
    // padding: '5 5 5 5 ',
    margin: '5 0 5 0',
  },
  help: {
    color: theme.palette.primary.light,
    fontSize: 'medium',
  },
  insertLeft: {
    transform: 'rotateY(180deg) scaleY(1.2)',
    color: theme.textPrimary,
  },
  insertRight: {
    color: theme.textPrimary,
    transform: 'scaleY(1.2)',
  },
  icon: {
    fontSize: 40,
    color: theme.textPrimary,
  },
  paper: {
    padding: theme.spacing(0.6),
    height: '4em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))

const InputBlock = ({ onClose, open, selectedNode }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const {
    addNodeBefore,
    addNodeAfter,
    changeNodeValues,
    toggleNodeSelect,
  } = useValueStream()

  const [formData, setFormData] = useState(defaultNodeData)
  const [errorList, setErrorList] = useState({})
  const [helpOpen, setHelpOpen] = useState(false)
  const [helpContent, setHelpContent] = useState('')

  const handleClose = (event) => {
    if (event) event.preventDefault()
    if (selectedNode && open) toggleNodeSelect(selectedNode)
    onClose()
  }

  useEffect(() => {
    if (selectedNode && open) {
      setFormData(selectedNode.data)
    } else {
      handleClose()
    }
  }, [open, selectedNode])

  const errorListExists = (errors) =>
    Object.entries(errors).find((e) => e[1] === true)

  const handleSubmit = (event) => {
    if (event) event.preventDefault()

    if (!errorListExists(errorList)) {
      changeNodeValues({ node: selectedNode, data: formData })
      handleClose()
    }
  }

  const handleInsertStep = (event) => {
    if (event) event.preventDefault()

    handleSubmit(event)
    addNodeBefore(selectedNode, true)
  }

  const handleAddStep = (event) => {
    if (event) event.preventDefault()

    handleSubmit(event)
    addNodeAfter(selectedNode, true)
  }

  const handleChange = (e, propName) => {
    const { value } = e.target
    setErrorList({
      ...errorList,
      [propName]: getFieldConfig(propName).isError(value),
    })
    setFormData({ ...formData, [propName]: e.target.value })
  }

  const handleHelpOpen = (propName) => {
    setHelpContent(getFieldConfig(propName).helpDoc)
    setHelpOpen(true)
  }
  const handleHelpClose = () => {
    setHelpOpen(false)
  }

  return (
    <>
      <Dialog open={helpOpen} onClose={handleClose} maxWidth="sm">
        <DialogContent>{helpContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleHelpClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle id="form-dialog-title">
          Update Process {selectedNode && selectedNode.id}
        </DialogTitle>
        <DialogContent>
          <form>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              {fieldConfigs.map((field) => (
                <Grid
                  container
                  item
                  direction="row"
                  justify="center"
                  alignItems="center"
                  xs={field.gridCols}
                  key={`gi_${field.propName}`}
                >
                  <Grid item xs={field.toolTip.length ? 10 : 12}>
                    <Paper
                      key={`p_${field.propName}`}
                      className={classes.paper}
                      elevation={0}
                      square
                    >
                      <TextField
                        key={field.propName}
                        className={classes.input}
                        type={field.type}
                        autoFocus={field.autoFocus}
                        inputProps={field.inputProps}
                        label={field.title}
                        value={formData[field.propName] || ''}
                        error={errorList[field.propName]}
                        onChange={(e) => handleChange(e, field.propName)}
                      />
                    </Paper>
                  </Grid>
                  {field.toolTip.length > 0 && (
                    <Grid item xs={2}>
                      <Paper className={classes.paper} elevation={0} square>
                        <IconButtonStyled
                          tabIndex={-1}
                          title={field.toolTip}
                          onClick={() => handleHelpOpen(field.propName)}
                        >
                          <HelpOutline className={classes.help} />
                        </IconButtonStyled>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              ))}
            </Grid>
          </form>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Paper className={classes.paper} elevation={0} square>
                <IconButtonStyled
                  title="Add step before"
                  onClick={handleInsertStep}
                >
                  <InputOutlined
                    className={`${classes.icon} ${classes.insertLeft}`}
                  />
                </IconButtonStyled>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper} elevation={0} square>
                {' '}
                <IconButtonStyled
                  title="Add step after"
                  onClick={handleAddStep}
                >
                  <InputOutlined
                    className={`${classes.icon} ${classes.insertRight}`}
                  />
                </IconButtonStyled>
              </Paper>
            </Grid>
          </Grid>
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
    </>
  )
}

export default InputBlock
