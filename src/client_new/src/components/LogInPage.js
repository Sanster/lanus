import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { withStyles, createStyleSheet } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

import * as authActions from '../actions/authActions'

const styleSheet = createStyleSheet('LogInPage', theme => ({
  root: {
    margin: 0,
    height: '100%'
  },
  paper: {
    width: 430,
    height: 280
  },
  form: {
    marginTop: 20
  },
  testField: {
    width: 200
  },
  loginButton: {
    width: 200,
    marginTop: 15
  }
}))

class LogInPage extends Component {
  constructor() {
    super()

    this.state = {
      credentials: {
        email: '',
        password: ''
      }
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event) {
    const field = event.target.id
    const credentials = this.state.credentials
    credentials[field] = event.target.value
    return this.setState({ credentials })
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.actions.logInUser(this.state.credentials)
  }

  render() {
    const classes = this.props.classes
    const { credentials } = this.state

    console.log(this.props)
    if (this.props.authed) {
      return <Redirect to="/userhome" />
    }

    return (
      <Grid container align="center" justify="center" className={classes.root}>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            align="center"
            justify="center"
            className={classes.form}
          >
            <TextField
              className={classes.testField}
              id="email"
              label="Email"
              margin="normal"
              value={credentials.email}
              onChange={this.onChange}
            />
            <TextField
              className={classes.testField}
              id="password"
              margin="normal"
              type="Password"
              label="password"
              value={credentials.password}
              onChange={this.onChange}
            />
            <Button
              raised
              color="primary"
              onClick={this.onSubmit}
              className={classes.loginButton}
            >
              Login
            </Button>
          </Grid>
        </Paper>
      </Grid>
    )
  }
}

LogInPage.propTypes = {
  classes: PropTypes.object.isRequired,
  authed: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    authed: state.authed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

export default withStyles(styleSheet)(
  connect(mapStateToProps, mapDispatchToProps)(LogInPage)
)
