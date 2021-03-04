import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const HelpDialog = ({ open, onClose, title, children }) => (
  <>
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle id="help-dialog-title">
        <Typography variant="h4" align="center">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </>
)

export default HelpDialog
