import { ButtonGroup, Grid } from '@material-ui/core'
import React from 'react'

import {
  AddNodeAfter,
  AddNodeBefore,
  FileUpload,
  ResetButton,
  SaveButton,
  SettingsButton,
  ToggleStretch,
  ZoomFocusButton,
  ZoomInButton,
  ZoomOutButton,
} from './Buttons'

const devMode = process.env.REACT_DEVMODE === 'on' ? true : false

const Controls = ({ onDialogOpen, selectedNode }) => {
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
            {devMode && <ToggleStretch />}
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
