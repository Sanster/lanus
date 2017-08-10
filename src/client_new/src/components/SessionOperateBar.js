import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles, createStyleSheet } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import AddIcon from 'material-ui-icons/Add'
import OpenIcon from 'material-ui-icons/PlayArrow'
import EditIcon from 'material-ui-icons/Edit'

const styleSheet = createStyleSheet('SessionOperateBar', theme => ({
  root: {
    width: '60%',
    margin: 'auto'
  }
}))

class SessionOperateBar extends Component {
  constructor() {
    super()
  }

  render() {
    const classes = this.props.classes

    return (
      <Grid container className={classes.root}>
        <IconButton>
          <OpenIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
        <IconButton>
          <AddIcon />
        </IconButton>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Grid>
    )
  }
}

export default withStyles(styleSheet)(SessionOperateBar)
