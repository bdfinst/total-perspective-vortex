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

const Controls = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <>
      <Container className={classes.root}>
        <ButtonGroup orientation="horizontal" color="secondary">
          <ZoomFocusButton />
          <ZoomInButton />
          <ZoomOutButton />
        </ButtonGroup>{' '}
      </Container>

      <Container className={classes.root}>
        <ButtonGroup orientation="horizontal" color="secondary">
          <ResetButton />
          <SaveButton />
          <FileUpload />
        </ButtonGroup>
      </Container>
    </>
  )
}

export default Controls
