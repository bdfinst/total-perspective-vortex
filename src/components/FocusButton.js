import { Button, Tooltip } from '@material-ui/core'
import { ZoomIn } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.backgroundColor,
    color: theme.primary,
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
      <Tooltip title={enabled ? 'Focus on element' : 'Select node to focus'}>
        <span>
          {/* wrap in <span> to display tooltip when disabled */}
          <Button
            className={classes.root}
            variant="contained"
            disabled={!enabled}
            startIcon={<ZoomIn />}
            onClick={onClick}
          >
            Focus
          </Button>
        </span>
      </Tooltip>
    </div>
  )
}

export default FocusButton
