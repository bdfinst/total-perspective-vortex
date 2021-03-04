import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import React from 'react'

const HelpDialog = ({ open, onClose }) => {
  const title = "Don't panic!"
  const helpContent =
    'Value stream mapping is the first step in improving a process flow Using the informaton in the VSM, we can identify the constraints we need to tackle first to maximize improvement of flow through the value stream. Classically, this is done by observing every step in a process and capturing the actual time taken for each step. This is not as easy with software delivery.'

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm">
        <DialogTitle id="help-dialog-title">{title}</DialogTitle>
        <DialogContent>{helpContent}</DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default HelpDialog
