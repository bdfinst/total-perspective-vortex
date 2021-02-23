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
  Tooltip,
} from '@material-ui/core'
import { HelpOutline, InputOutlined } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { IconButtonStyled } from '../Buttons'
import { defaultNodeData } from '../../helpers'
import { fieldConfigs, getFieldConfig } from './formConfigs'
import { useValueStream } from '../../appContext/valueStreamContext'

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
  const { changeNodeValues, addNodeBefore, addNodeAfter } = useValueStream()

  const [formData, setFormData] = useState(defaultNodeData)
  const [errorList, setErrorList] = useState({})
  const [helpOpen, setHelpOpen] = useState(false)
  const [helpContent, setHelpContent] = useState('')

  useEffect(() => {
    if (selectedNode && open) {
      setFormData(selectedNode.data)
    } else {
      handleClose()
    }
  }, [selectedNode])

  useEffect(() => {
    console.log(`Form Data: ${JSON.stringify(formData)}`)
  }, [formData])

  useEffect(() => {
    console.log(`Form Errors: ${JSON.stringify(errorList)}`)
  }, [errorList])

  const handleClose = () => {
    onClose()
  }

  const errorListExists = (errors) => {
    return Object.entries(errors).find((e) => e[1] === true)
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault()

    if (!errorListExists(errorList)) {
      changeNodeValues({ node: selectedNode, data: formData })
      handleClose()
    }
  }

  const handleInsertStep = () => {
    addNodeBefore(selectedNode)
  }
  const handleAddStep = () => {
    addNodeAfter(selectedNode)
  }

  const handleChange = (e, propName) => {
    const value = e.target.value
    setErrorList({
      ...errorList,
      [propName]: getFieldConfig(propName).isError(value),
    })
    setFormData({ ...formData, [propName]: e.target.value })
  }

  const InputPaper = ({ children }) => (
    <Paper
      className={classes.paper}
      elevation={2}
      square={true}
      children={children}
    >
      {children}
    </Paper>
  )

  const handleHelpOpen = (propName) => {
    setHelpContent(getFieldConfig(propName).helpDoc)
    setHelpOpen(true)
  }
  const handleHelpClose = () => {
    setHelpOpen(false)
  }

  // const displayHelp = (propName) => {
  //   setHelpOpen(true)

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
                    <InputPaper>
                      <TextField
                        key={field.propName}
                        className={classes.input}
                        type={field.type}
                        label={field.title}
                        fullWidth={field.fullWidth}
                        value={formData[field.propName] || ''}
                        error={errorList[field.propName]}
                        onChange={(e) => handleChange(e, field.propName)}
                      />
                    </InputPaper>
                  </Grid>
                  {field.toolTip.length > 0 && (
                    <Grid xs={2}>
                      <Paper
                        className={classes.paper}
                        elevation={0}
                        square={true}
                      >
                        <IconButtonStyled
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
              <InputPaper>
                <IconButtonStyled
                  title="Add step before"
                  onClick={handleInsertStep}
                >
                  <InputOutlined
                    className={`${classes.icon} ${classes.insertLeft}`}
                  />
                </IconButtonStyled>
              </InputPaper>
            </Grid>
            <Grid item xs={6}>
              <InputPaper>
                <IconButtonStyled
                  title="Add step after"
                  onClick={handleAddStep}
                >
                  <InputOutlined
                    className={`${classes.icon} ${classes.insertRight}`}
                  />
                </IconButtonStyled>
              </InputPaper>
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
