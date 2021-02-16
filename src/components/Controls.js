import { ButtonGroup } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

import { FileUpload, ResetButton, SaveButton, ZoomButtonGroup } from './Buttons'

const useStyles = makeStyles((theme) => ({
  root: { zIndex: 'appBar' },
}))

const Controls = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <div className={classes.root}>
      <ButtonGroup orientation="vertical" color="primary">
        <ButtonGroup orientation="vertical">
          <ResetButton />
          <SaveButton />
          <FileUpload />
        </ButtonGroup>
        <br />
        <ZoomButtonGroup />
      </ButtonGroup>
    </div>
  )
}

export default Controls
