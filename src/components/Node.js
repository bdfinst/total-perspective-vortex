import React, { useState } from 'react'
import { Handle } from 'react-flow-renderer'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'

import { InputNumber, InputText } from './Inputs'
import { useValueStream } from '../reactContext'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    float: 'right',
  },
}))

const Node = (props) => {
  const classes = useStyles()

  const { changeNodeValues } = useValueStream()
  const [node, setNode] = useState(props)

  const updateNode = (id, value) => {
    setNode((prevNode) => ({
      ...prevNode,
      data: { ...prevNode.data, [id]: value },
    }))
  }
  const handleCycleTimeChange = (e) => {
    const { value } = e.target

    if (Number(value) < Number(node.data.processTime)) {
      e.target.value = node.data.processTime
    }
    handleChange(e)
  }

  const handleChange = (e) => {
    const { id, value } = e.target

    updateNode(id, value)
  }

  const handleUpdate = (e) => {
    changeNodeValues(node.id, node.data)
  }

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        onConnect={(params) => {
          console.log('handle onConnect', params)
        }}
      />
      <div className="node-container">
        <div className="row">
          <InputText
            id={`stepDescription_${node.id}`}
            name="stepDescription"
            label="Description"
            onChange={handleChange}
            onBlur={handleUpdate}
          />
        </div>
        <div className="row">
          <InputNumber
            id={`processTime_${node.id}`}
            name="processTime"
            label="Process Time"
            inputProps={{ min: 0, max: 9999999 }}
            onChange={handleChange}
            onBlur={handleUpdate}
          />
        </div>
        <div className="row">
          <InputNumber
            id={`cycleTime_${node.id}`}
            name="cycleTime"
            label="Wait Time"
            inputProps={{ min: 0, max: 9999999 }}
            onChange={handleCycleTimeChange}
            onBlur={handleUpdate}
          />
        </div>
        <div className="row">
          <InputNumber
            id={`pctCompleteAccurate_${node.id}`}
            name="pctCompleteAccurate"
            inputProps={{ min: 0, max: 100 }}
            label="% C/A"
            onChange={handleChange}
            onBlur={handleUpdate}
          />
          <IconButton aria-label="delete" className={classes.extendedIcon}>
            <DeleteTwoToneIcon />
          </IconButton>
        </div>
      </div>

      <Handle
        type="source"
        position="right"
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{ background: '#555' }}
      />
    </>
  )
}

export default Node
