import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    authed: state.authed
  }
}

class PrivateRoute extends Component {
  render() {
    const { authed, path, component: PrivateComponent } = this.props

    return (
      <Route
        path={path}
        exact
        render={() =>
          authed ? <PrivateComponent /> : <Redirect to="/sessions" />}
      />
    )
  }
}

// why withRouter: https://reacttraining.com/react-router/web/guides/redux-integration
export default withRouter(connect(mapStateToProps)(PrivateRoute))
