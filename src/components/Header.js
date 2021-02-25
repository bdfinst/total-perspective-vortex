import {
  AppBar,
  Button,
  Container,
  IconButton,
  Typography,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    // padding: '0 0 0 0',
  },
}))

export default function Header() {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <Container className={classes.container}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Value Stream Map
          </Typography>
        </Toolbar>
      </AppBar>
    </Container>
  )
}
