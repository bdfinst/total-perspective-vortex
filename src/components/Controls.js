import React, { useState } from 'react'
import { ButtonGroup } from '@material-ui/core'

import { FileUpload, FocusButton, ResetButton, SaveButton } from './Buttons'

const Controls = ({ handleReset, handleExport, focusNode, isNodeSelected }) => {
  return (
    <>
      <ButtonGroup orientation="vertical" color="primary">
        <ResetButton onClick={handleReset} />
        <SaveButton onClick={handleExport} />
        <FileUpload />
        <FocusButton onClick={focusNode} enabled={isNodeSelected} />
      </ButtonGroup>
    </>
  )
}

export default Controls
