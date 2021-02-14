import React, { useState } from 'react'
import { DeleteTwoTone } from '@material-ui/icons'
import { Grid, IconButton } from '@material-ui/core'
import { Handle } from 'react-flow-renderer'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { InputNumber, InputText } from './Inputs'
import { useValueStream } from '../appContext/valueStreamContext'

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    float: 'right',
  },
  nodeContainer: {
    width: 175,
    background: theme.palette.background.paper,
    borderColor: theme.palette.primary.dark,
    borderRadius: '12px',
    borderStyle: 'solid',
    borderWidth: '4px',
    padding: 5,
  },
}))

const Node = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)

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
    changeNodeValues({ node: node, data: node.data })
  }

  const EdgeHandle = ({ type }) => {
    const parms = {
      type: type === 'source' ? type : 'target',
      side: type === 'source' ? 'right' : 'left',
      color: type === 'source' ? 'green' : 'red',
    }
    return (
      <Handle
        type={parms.type}
        position={parms.side}
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{
          background: parms.color,
          width: '15px',
          height: '15px',
          [parms.side]: '-9px',
        }}
      />
    )
  }
  const buttons = [
    {
      name: 'actors',
      label: 'Actors',
      max: 999999,
      onChange: handleNumberChange,
    },
    {
      name: 'processTime',
      label: 'Process Time',
      max: 999999,
      onChange: handleNumberChange,
    },
    {
      name: 'waitTime',
      label: 'Wait Time',
      max: 999999,
      onChange: handleNumberChange,
    },
    {
      name: 'pctCompleteAccurate',
      label: '% C/A',
      max: 100,
      onChange: handleChange,
    },
  ]
  return (
    <>
      <EdgeHandle type="target" />
      <div className={classes.nodeContainer}>
        <Grid container>
          <Grid item xs={12}>
            <InputText
              id={`description_${node.id}`}
              name="description"
              label="Description"
              onChange={handleChange}
              onBlur={handleUpdate}
            />
          </Grid>
          {buttons.map((button) => (
            <Grid item xs={12} key={`${button.name}_${node.id}`}>
              <InputNumber
                id={`${button.name}_${node.id}`}
                name={button.name}
                label={button.label}
                inputProps={{ min: 0, max: button.max }}
                onChange={button.onChange}
                onBlur={handleUpdate}
              />
            </Grid>
          ))}

          {/* <IconButton
            aria-label="delete"
            className={classes.extendedIcon}
            onClick={(delNode) => {
              console.log(`onClick Delete ${JSON.stringify(delNode)}`)
            }}
          >
            <DeleteTwoToneIcon />
          </IconButton> */}
        </Grid>
      </div>
      <EdgeHandle type="source" />
    </>
  )
}

export default Node
