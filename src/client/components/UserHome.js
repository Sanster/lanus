import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles, createStyleSheet } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

import SessionList from './SessionList'
import SessionOperateBar from './SessionOperateBar'

const styleSheet = createStyleSheet('SessionsPage', theme => ({
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  }
}))

class SessionsPage extends Component {
  constructor() {
    super()
  }

  onChange(event) {}

  render() {
    const classes = this.props.classes

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" className={classes.flex}>
              {' '}Meng{' '}
            </Typography>
            <IconButton color="contrast" aria-label="Menu">
              <Link to="/sessions">
                <MenuIcon />
              </Link>
            </IconButton>
          </Toolbar>
        </AppBar>
        <SessionOperateBar />
        <SessionList />
      </div>
    )
  }
}

export default withStyles(styleSheet)(SessionsPage)
