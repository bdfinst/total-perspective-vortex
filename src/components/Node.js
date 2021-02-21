import React, { useEffect, useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { Handle } from 'react-flow-renderer'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { defaultNodeData } from '../helpers'
import { useValueStream } from '../appContext/valueStreamContext'
import inputFieldDefs from './InputDialog/fieldDefs'

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    float: 'right',
  },
  number: {
    alignText: 'right',
  },
}))

const Node = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { state } = useValueStream()
  const [node, setNode] = useState(props)

  useEffect(() => {
    const data = state.elements.find((el) => el.id === node.id)
    const newNode = { ...node, data }
    setNode(newNode)
  }, [state.elements])

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

  return (
    <>
      <EdgeHandle type="target" />
      <div className="node-container">
        <Grid container>
          <Grid item xs={12}>
            <TextField
              className={classes.title}
              key={`${inputFieldDefs[0].id}_${node.id}`}
              id={`${inputFieldDefs[0].id}_${node.id}`}
              label={inputFieldDefs[0].label}
              defaultValue={node.data[inputFieldDefs[0].id]}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              margin="dense"
            />
          </Grid>
          {inputFieldDefs
            .filter((field) => field.id !== 'processName')
            .map((field) => {
              const suffix = field.id === 'pctCompleteAccurate' ? '%' : ''
              return (
                <Grid item xs={6} key={`gi_${field.id}`}>
                  <TextField
                    className={classes.number}
                    key={`${field.id}_${node.id}`}
                    id={`${field.id}_${node.id}`}
                    label={field.label.split(' ')[0]}
                    defaultValue={`${node.data[field.id]}${suffix}`}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
              )
            })}
        </Grid>
      </div>
      <EdgeHandle type="source" />
    </>
  )
}

export default Node
