import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { withStyles, createStyleSheet } from 'material-ui/styles'

import LogInPage from './components/LogInPage'
import UserHome from './components/UserHome'
import SessionsPage from './components/SessionsPage'
import PrivateRoute from './containers/privateRoute'

import './app.css'

const style = createStyleSheet('root', theme => ({
  root: {
    height: '100%',
    width: '100%'
  }
}))

class App extends Component {
  render() {
    const { classes } = this.props

    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Route path="/login" component={LogInPage} />
          <PrivateRoute path="/sessions" component={SessionsPage} />
          <PrivateRoute path="/" component={UserHome} />
        </div>
      </BrowserRouter>
    )
  }
}

export default withStyles(style)(App)
