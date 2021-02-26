import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'

import './App.css'
import Main from './components/Main'
import Routes from './components/Routes'
import theme from './theme'

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main />
        <Switch>
          {Routes.map((route) => (
            <Route exact path={route.path} key={route.path}>
              <route.component />
            </Route>
          ))}
        </Switch>
      </ThemeProvider>
    </>
  )
}

export default App
