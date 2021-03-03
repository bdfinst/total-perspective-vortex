import { ButtonGroup, Grid } from '@material-ui/core'
import React from 'react'

import {
  AddNode,
  AddNodeAfter,
  FileUpload,
  ResetButton,
  SaveButton,
  ToggleStretch,
  ZoomFocusButton,
  ZoomInButton,
  ZoomOutButton,
} from './Buttons'

const devMode = process.env.REACT_DEVMODE === 'on'

const Controls = ({ selectedNode }) => (
  <>
    <Grid container direction="row" justify="space-around" alignItems="center">
      <Grid item xs={4}>
        <ButtonGroup orientation="horizontal" color="secondary">
          <ZoomFocusButton />
          <ZoomInButton />
          <ZoomOutButton />
        </ButtonGroup>
      </Grid>
      <Grid item xs={4}>
        <ButtonGroup orientation="horizontal" color="secondary">
          <AddNode />
          {devMode && <ToggleStretch />}
          <AddNodeAfter selectedNode={selectedNode} />
        </ButtonGroup>
      </Grid>
      <Grid item xs={4}>
        <ButtonGroup orientation="horizontal" color="secondary">
          <ResetButton />
          <SaveButton />
          <FileUpload />
        </ButtonGroup>
      </Grid>
    </Grid>
  </>
)

export default Controls
