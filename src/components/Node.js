import React, { useEffect, useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { Handle } from 'react-flow-renderer'
import { makeStyles, useTheme } from '@material-ui/core/styles'

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
  const [data, setData] = useState(
    state.elements.find((el) => el.id === node.id).data,
  )

  useEffect(() => {
    setData(state.elements.find((el) => el.id === node.id).data)
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
              value={data[inputFieldDefs[0].id]}
              variant="outlined"
              margin="dense"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          {inputFieldDefs.map((field) => {
            const suffix = field.id === 'pctCompleteAccurate' ? '%' : ''
            if (field.id !== 'processName') {
              return (
                <Grid item xs={6}>
                  <TextField
                    className={classes.number}
                    key={`${field.id}_${node.id}`}
                    id={`${field.id}_${node.id}`}
                    label={field.label.split(' ')[0]}
                    value={`${data[field.id]}${suffix}`}
                    variant="outlined"
                    margin="dense"
                    InputProps={{
                      readOnly: true,
                      style: { textAlign: 'right' },
                    }}
                  />
                </Grid>
              )
            }
          })}
        </Grid>
      </div>
      <EdgeHandle type="source" />
    </>
  )
}

export default Node
