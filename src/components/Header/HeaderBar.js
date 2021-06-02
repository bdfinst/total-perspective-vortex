import React, { useState } from 'react'
import { HelpOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'

import { GitHubButton } from '../ValueStreamMap/Buttons'
import AppHelpContent from '../AppHelpContent'
import HelpDialog from '../HelpDialog'
import config from '../../globalConfig'

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 10, // keep right padding when drawer closed
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: config.drawerWidth,
    width: `calc(100% - ${config.drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}))

export default function HeaderBar({ onClick, open }) {
  const classes = useStyles()
  const [helpOpen, setHelpOpen] = useState(false)
  const handleDrawerOpen = () => {
    onClick()
  }

  const handleHelpOpen = () => {
    setHelpOpen(true)
  }
  const handleHelpClose = () => {
    setHelpOpen(false)
  }

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <img src="tpvLogos/tpv_light_logo.png" width="90px" alt="logo" />
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Total Perspective Vortex
        </Typography>
        <IconButton
          component="span"
          onClick={handleHelpOpen}
          title="Help"
          color="inherit"
        >
          <HelpOutlined />
        </IconButton>
        <GitHubButton />
      </Toolbar>
      <HelpDialog
        title="Don't Panic!"
        open={helpOpen}
        onClose={handleHelpClose}
      >
        <AppHelpContent />
      </HelpDialog>
    </AppBar>
  )
}
