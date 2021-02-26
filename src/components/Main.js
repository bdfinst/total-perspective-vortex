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
import HeaderBar from './HeaderBar'
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
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 10, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 350,
  },
  vsmHeight: {
    height: 550,
  },
}))

const Main = (props) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const activeRoute = (routeName) => {
    return props.location.pathname === routeName ? true : false
  }

  return (
    <div className={classes.root}>
      <HeaderBar onClick={handleDrawerOpen} open={open} />

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <MenuList>
          {Routes.map((prop, key) => {
            return (
              <NavLink
                to={prop.path}
                style={{ textDecoration: 'none' }}
                key={key}
              >
                <MenuItem selected={activeRoute(prop.path)}>
                  <ListItemIcon>
                    <CRDIcon />
                  </ListItemIcon>
                  <ListItemText primary={prop.sidebarName} />
                </MenuItem>
              </NavLink>
            )
          })}
        </MenuList>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            <ValueStream />
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  )
}

export default withRouter(Main)
