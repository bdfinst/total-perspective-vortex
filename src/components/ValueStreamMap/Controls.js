import { ButtonGroup, Grid } from '@material-ui/core'
import React from 'react'

import {
  AddNode,
  AddNodeAfter,
  AddReworkNode,
  FileUpload,
  HelpButton,
  ResetButton,
  SaveButton,
  ToggleStretch,
  ZoomFocusButton,
  ZoomInButton,
  ZoomOutButton,
} from './Buttons'
import flags from '../../featureFlags/flags'

const devMode = process.env.REACT_DEVMODE === 'on'

const Controls = ({ selectedNode, onVsmHelpOpen }) => (
  <>
    <Grid container direction="row" justify="space-around" alignItems="center">
      <Grid item xs={4}>
        <ButtonGroup orientation="horizontal" color="secondary">
          <ZoomFocusButton />
          <ZoomInButton />
          <ZoomOutButton />
        </ButtonGroup>
      </Grid>
      <Grid item xs={4} align="center">
        <ButtonGroup orientation="horizontal" color="secondary">
          {flags.showRetryNodes ? <AddReworkNode /> : <div />}
          <AddNode />
          {devMode && <ToggleStretch />}
          <AddNodeAfter selectedNode={selectedNode} />
        </ButtonGroup>
      </Grid>
      <Grid item xs={4} align="right">
        <ButtonGroup orientation="horizontal" color="secondary">
          <ResetButton />
          <SaveButton />
          <FileUpload />
          <HelpButton title="VSM help" onClick={onVsmHelpOpen} />
        </ButtonGroup>
      </Grid>
    </Grid>
  </>
)

export default Controls
