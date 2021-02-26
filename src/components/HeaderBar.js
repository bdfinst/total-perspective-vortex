import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from '@material-ui/core'
import { NavLink, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import CRDIcon from '@material-ui/icons/DeviceHubTwoTone'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import GraphIcon from '@material-ui/icons/AssessmentOutlined'
import Grid from '@material-ui/core/Grid'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import List from '@material-ui/core/List'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import VSMIcon from '@material-ui/icons/AccountTreeTwoTone'
import clsx from 'clsx'

import { mainListItems, secondaryListItems } from './Menu/listItems'
import Routes from './Routes'
import ValueStream from './ValueStream'

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://bryanfinster.com/">
        BryanFinster.com
      </Link>
    </Typography>
  )
}

const drawerWidth = 200

const useStyles = makeStyles((theme) => ({
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
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
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
  const handleDrawerOpen = () => {
    onClick()
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
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Total Perspective Vortex
        </Typography>
        {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
      </Toolbar>
    </AppBar>
  )
}
