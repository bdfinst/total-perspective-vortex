import { ButtonGroup, Container, Paper } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

import {
  FileUpload,
  ResetButton,
  SaveButton,
  ZoomFocusButton,
  ZoomInButton,
  ZoomOutButton,
} from './Buttons'

const useStyles = makeStyles((theme) => ({
  overrides: {
    MuiPaper: {
      textAlign: 'center',
      color: 'orange',
    },
  },
  root: {
    background: 'orange',
    padding: '0 0 0 0',
    // width: '2.1em',
  },
}))

const Controls = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <>
      <Container className={classes.root}>
        <Paper>
          {/* <ButtonGroup orientation="horizontal" color="secondary"> */}
          <ZoomFocusButton />
          <ZoomInButton />
          <ZoomOutButton />
          {/* </ButtonGroup> */}
        </Paper>

        <Paper>
          {/* <ButtonGroup orientation="horizontal" color="secondary"> */}
          <ResetButton />
          <SaveButton />
          <FileUpload />
          {/* </ButtonGroup> */}
        </Paper>
      </Container>
    </>
  )
}

export default Controls
