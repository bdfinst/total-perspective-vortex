import React, { useState } from 'react'
import { DeleteTwoTone } from '@material-ui/icons'
import { Grid, IconButton } from '@material-ui/core'
import { Handle } from 'react-flow-renderer'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { InputNumber, InputText } from './Inputs'
import { nodeDefaults } from '../helpers'
import { useValueStream } from '../appContext/valueStreamContext'
import InputBlock from './InputBlock'

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    float: 'right',
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
    const settings = (handleType) => {
      switch (handleType) {
        case 'target':
          return { type: 'target', side: 'left', color: 'red' }
        case 'target2':
          return { type: 'target', side: 'top', color: 'red' }
        default:
          return { type: 'source', side: 'right', color: 'green' }
      }
    }
    // const parms = {
    //   type: type === 'source' ? type : 'target',
    //   side: type === 'source' ? 'right' : 'left',
    //   color: type === 'source' ? 'green' : 'red',
    // }
    return (
      <Handle
        type={settings(type).type}
        position={settings(type).side}
        onConnect={(params) => console.log('handle onConnect', settings(type))}
        style={{
          background: settings(type).color,
          width: '15px',
          height: '15px',
          [settings(type).side]: '-9px',
        }}
      />
    )
  }

  const buttons = [
    {
      name: 'processTime',
      label: 'Work',
      max: 999,
      onChange: handleNumberChange,
    },
    {
      name: 'waitTime',
      label: 'Wait',
      max: 999,
      onChange: handleNumberChange,
    },
    {
      name: 'actors',
      label: 'Actors',
      max: 99,
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
      <div className="node-container">
        <Grid container>
          <Grid item xs={12}>
            <InputText
              id={`description_${node.id}`}
              name="description"
              label="Description"
              onChange={handleChange}
              onBlur={handleUpdate}
            />

            {buttons.map((button) => (
              <InputNumber
                id={`${button.name}_${node.id}`}
                key={`${button.name}_${node.id}`}
                name={button.name}
                label={button.label}
                value={node.data[button.name]}
                inputProps={{ min: 0, max: button.max }}
                onChange={button.onChange}
                onBlur={handleUpdate}
              />
            ))}
          </Grid>
        </Grid>
      </div>
      <EdgeHandle type="source" />
    </>
  )
}

export default Node
