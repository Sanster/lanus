import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles, createStyleSheet } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

const styleSheet = createStyleSheet('AddSession', theme => ({}))

class AddSession extends Component {
  constructor() {
    super()
  }

  render() {
    const classes = this.props.classes

    return <div> </div>
  }
}

export default withStyles(styleSheet)(AddSession)
