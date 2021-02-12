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

  const updateNode = (name, value) => {
    setNode((prevNode) => ({
      ...prevNode,
      data: { ...prevNode.data, [name]: value },
    }))
  }
  const handleNumberChange = (e) => {
    const { name, value } = e.target

    updateNode(name, Number(value))
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    updateNode(name, value)
  }

  const handleUpdate = (e) => {
    changeNodeValues(node.id, node.data)
  }

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{
          background: 'red',
          width: '15px',
          height: '15px',
          left: '-9px',
        }}
        onConnect={(params) => {
          console.log('handle onConnect', params)
        }}
      />
      <div className="node-container">
        <div className="row">
          <InputText
            id={`description_${node.id}`}
            name="description"
            label="Description"
            onChange={handleChange}
            onBlur={handleUpdate}
          />
        </div>
        <div className="row">
          <InputNumber
            id={`actors_${node.id}`}
            name="actors"
            label="Actors"
            inputProps={{ min: 0, max: 9999999 }}
            onChange={handleNumberChange}
            onBlur={handleUpdate}
          />
        </div>
        <div className="row">
          <InputNumber
            id={`processTime_${node.id}`}
            name="processTime"
            label="Process Time"
            inputProps={{ min: 0, max: 9999999 }}
            onChange={handleNumberChange}
            onBlur={handleUpdate}
          />
        </div>
        <div className="row">
          <InputNumber
            id={`waitTime_${node.id}`}
            name="waitTime"
            label="Wait Time"
            inputProps={{ min: 0, max: 9999999 }}
            onChange={handleNumberChange}
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
          <IconButton
            aria-label="delete"
            className={classes.extendedIcon}
            onClick={(delNode) => {
              console.log(`onClick Delete ${JSON.stringify(delNode)}`)
            }}
          >
            <DeleteTwoToneIcon />
          </IconButton>
        </div>
      </div>

      <Handle
        type="source"
        position="right"
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{
          background: 'green',
          width: '15px',
          height: '15px',
          right: '-9px',
        }}
      />
    </>
  )
}

export default Node
