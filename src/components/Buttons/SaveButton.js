import { Button, Tooltip } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import React from 'react'

const SaveButton = (props) => {
  return (
    <div>
      <Tooltip title="Export to file">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={props.onClick}
        >
          Save
        </Button>
      </Tooltip>
    </div>
  )
}

export default SaveButton
