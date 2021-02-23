import React, { useState } from 'react'
import {
  AppBar,
  Container,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Mail, Menu, MoveToInbox } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { ValueStreamProvider } from '../appContext/valueStreamContext'
import ValueStreamMap from '../components/ValueStreamMap'
import styles from '../styles/Home.module.css'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

export default function Home() {
  // const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // const container =
  //   window !== undefined ? () => window().document.body : undefined

  return (
    <Container>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <ListItem>
                      {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
                    </ListItem>
                    <ListItemText primary={text} />
                  </ListItem>
                ),
              )}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItem>
                    {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
                  </ListItem>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div className={classes.toolbar} />
            <Divider />
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <ListItem>
                      {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
                    </ListItem>
                    <ListItemText primary={text} />
                  </ListItem>
                ),
              )}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItem>
                    {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
                  </ListItem>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>{' '}
          </Drawer>
        </Hidden>
      </nav>
      <main className={styles.main}>
        <ValueStreamProvider>
          <ValueStreamMap />
        </ValueStreamProvider>
      </main>
    </Container>
  )
}
