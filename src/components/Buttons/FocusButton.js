import { Button, Tooltip } from '@material-ui/core'
import { ZoomIn } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    '&.Mui-disabled': {
      pointerEvents: 'auto',
    },
  },
}))

const FocusButton = ({ onClick, enabled }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <div>
      {/* wrap in <span> to display tooltip when disabled */}
      <Button
        className={classes.root}
        color="primary"
        variant="contained"
        disabled={!enabled}
        startIcon={<ZoomIn />}
        onClick={onClick}
      >
        Focus
      </Button>
    </div>
  )
}

export default FocusButton
