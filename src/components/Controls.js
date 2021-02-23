import { ButtonGroup, Grid } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

import {
  AddNodeAfter,
  AddNodeBefore,
  FileUpload,
  ResetButton,
  SaveButton,
  SettingsButton,
  ZoomFocusButton,
  ZoomInButton,
  ZoomOutButton,
} from './Buttons'
import AddNode from './AddNode'

const useStyles = makeStyles((theme) => ({
  overrides: {
    MuiPaper: {
      textAlign: 'center',
      padding: '0 0 0 0',
      elevation: 0,
    },
    MuiContainer: {
      align: 'center',
      paddingTop: '10',
    },
  },
  root: {
    // width: '2.1em',
  },
}))

const Controls = ({ onDialogOpen, selectedNode }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={2}>
          <ButtonGroup orientation="horizontal" color="secondary">
            <ZoomFocusButton />
            <ZoomInButton />
            <ZoomOutButton />
          </ButtonGroup>
        </Grid>
        <Grid>
          <ButtonGroup orientation="horizontal" color="secondary">
            <AddNodeBefore selectedNode={selectedNode} />
            <SettingsButton
              onDialogOpen={onDialogOpen}
              selectedNode={selectedNode}
            />
            <AddNodeAfter selectedNode={selectedNode} />
          </ButtonGroup>
        </Grid>
        <Grid item xs={2}>
          <ButtonGroup orientation="horizontal" color="secondary">
            <ResetButton />
            <SaveButton />
            <FileUpload />
          </ButtonGroup>
        </Grid>
      </Grid>
    </>
  )
}

export default Controls
