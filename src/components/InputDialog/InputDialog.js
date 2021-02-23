import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from '@material-ui/core'
import { InputOutlined } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { IconButtonStyled } from '../Buttons'
import { defaultNodeData } from '../../helpers'
import { fieldConfigs, getFieldConfig } from './formConfigs'
import { useValueStream } from '../../appContext/valueStreamContext'

const useStyles = makeStyles((theme) => ({
  input: {
    padding: '5 5 5 5 ',
    margin: 8,
  },
  help: {
    color: theme.palette.primary.light,
    fontSize: 'medium',
  },
  insertLeft: {
    transform: 'rotateY(180deg)',
    color: theme.textPrimary,
  },
  insertRight: {
    color: theme.textPrimary,
  },
  icon: {
    fontSize: 40,
    color: theme.textPrimary,
  },
}))

const InputBlock = ({ onClose, open, selectedNode }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { changeNodeValues, addNodeBefore, addNodeAfter } = useValueStream()

  const [formData, setFormData] = useState(selectedNode.data || {})
  const [errorList, setErrorList] = useState({})

  useEffect(() => {
    console.log(`Form Data: ${JSON.stringify(formData)}`)
  }, [formData])

  useEffect(() => {
    console.log(`Form Errors: ${JSON.stringify(errorList)}`)
  }, [errorList])

  // const [submitted, setSubmitted] = useState(false)
  // const [nodeData, setNodeData] = useState(defaultNodeData)

  const handleClose = () => {
    // setSubmitted(false)
    onClose()
  }

  const errorListExists = (errors) => {
    return Object.entries(errors).find((e) => e[1] === true)
  }

  // useEffect(() => {
  //   if (selectedNode && open) {
  //     setNodeData(selectedNode.data)
  //   } else {
  //     handleClose()
  //   }
  // }, [selectedNode])

  // useEffect(() => {
  //   const error = errorListExists(errorList)
  //   if (submitted && !error) handleClose()
  // }, [submitted, errorList])

  // useEffect(() => {
  //   console.log(`nodeData: ${JSON.stringify(nodeData)}`)
  // }, [nodeData])

  // const handleSubmit = (event) => {
  //   console.log(`submit ${event.target}`)
  // }

  const handleSubmit = (event) => {
    if (event) event.preventDefault()

    if (!errorListExists(errorList)) {
      changeNodeValues({ node: selectedNode, data: formData })
      // setSubmitted(true)
      handleClose()
    }
  }

  // const handleChange = (value, errors, propName) => {
  //   console.log(value)
  //   setErrorList(errors)
  //   setNodeData({ ...nodeData, [propName]: value })
  // }

  // const handleBlur = (data, errors, propName) => {
  //   handleChange(data, errors, propName)
  // }

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

  return (
    <Dialog open={open} onClose={handleClose}>
      {/* <DialogTitle id="form-dialog-title">
        Process {selectedNode.id}
      </DialogTitle> */}
      <DialogContent>
        <form>
          <Grid constainer>
            {fieldConfigs.map((field) => (
              <Grid item xs={field.gridCols} key={`gi_${field.propName}`}>
                <TextField
                  key={field.propName}
                  type={field.type}
                  value={formData[field.propName] || ''}
                  error={errorList[field.propName]}
                  onChange={(e) => handleChange(e, field.propName)}
                />
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
            <IconButtonStyled
              title="Add step before"
              onClick={handleInsertStep}
            >
              <InputOutlined
                className={`${classes.icon} ${classes.insertLeft}`}
              />
            </IconButtonStyled>
          </Grid>
          <Grid item xs={6}>
            <IconButtonStyled title="Add step after" onClick={handleAddStep}>
              <InputOutlined
                className={`${classes.icon} ${classes.insertRight}`}
              />
            </IconButtonStyled>
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
  )
}

export default InputBlock
