import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from '@material-ui/core'
import { InputOutlined } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { IconButtonStyled } from '../Buttons'
import {
  InputAccuracy,
  InputActors,
  InputProcessName,
  InputProcessTime,
  InputValue,
  InputWaitTime,
} from './InputFields'
import { defaultNodeData } from '../../helpers'
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

  const [submitted, setSubmitted] = useState(false)
  const [errorList, setErrorList] = useState({})
  const [nodeData, setNodeData] = useState(defaultNodeData)

  const handleClose = () => {
    setSubmitted(false)
    onClose()
  }

  const errorListExists = (errors) => {
    return Object.entries(errors).find((e) => e[1] === true)
  }

  useEffect(() => {
    if (selectedNode && open) {
      setNodeData(selectedNode.data)
    } else {
      handleClose()
    }
  }, [selectedNode])

  // useEffect(() => {
  //   const error = errorListExists(errorList)
  //   if (submitted && !error) handleClose()
  // }, [submitted, errorList])

  useEffect(() => {
    console.log(`nodeData: ${JSON.stringify(nodeData)}`)
  }, [nodeData])

  const handleSubmit = (event) => {
    if (event) event.preventDefault()

    if (!errorListExists(errorList)) {
      changeNodeValues({ node: selectedNode, data: nodeData })
      setSubmitted(true)
      handleClose()
    }
  }

  const handleChange = (value, errors, propName) => {
    console.log(value)
    setErrorList(errors)
    setNodeData({ ...nodeData, [propName]: value })
  }

  // const handleBlur = (data, errors, propName) => {
  //   handleChange(data, errors, propName)
  // }

  const handleInsertStep = () => {
    addNodeBefore(selectedNode)
  }
  const handleAddStep = () => {
    addNodeAfter(selectedNode)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      {/* <DialogTitle id="form-dialog-title">
        Process {selectedNode.id}
      </DialogTitle> */}
      <DialogContent>
        <form>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <InputValue
              node={selectedNode}
              propName="processName"
              errors={errorList}
              onChange={handleChange}
              // onBlur={handleBlur}
            />
            <InputValue
              node={selectedNode}
              propName="processTime"
              errors={errorList}
              onChange={handleChange}
              // onBlur={handleBlur}
            />
            {/* <InputProcessName
              node={selectedNode}
              property="processName"
              errors={errorList}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <InputProcessTime
              node={selectedNode}
              property="processTime"
              errors={errorList}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          <InputWaitTime
              node={selectedNode}
              errors={errorList}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <InputActors
              node={selectedNode}
              errors={errorList}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <InputAccuracy
              node={selectedNode}
              errors={errorList}
              onChange={handleChange}
              onBlur={handleBlur}
            /> */}
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
