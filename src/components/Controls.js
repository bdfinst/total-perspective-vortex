import { ButtonGroup } from '@material-ui/core'
import React from 'react'

import { FileUpload, ResetButton, SaveButton, ZoomButtonGroup } from './Buttons'

const Controls = () => {
  return (
    <>
      <ButtonGroup orientation="vertical" color="primary">
        <ButtonGroup orientation="vertical">
          <ResetButton />
          <SaveButton />
          <FileUpload />
        </ButtonGroup>
        <br />
        <ZoomButtonGroup />
      </ButtonGroup>
    </>
  )
}

export default Controls
