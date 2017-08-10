import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles, createStyleSheet } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Grid from 'material-ui/Grid'
import Tabs, { Tab } from 'material-ui/Tabs'
import IconButton from 'material-ui/IconButton'
import SettingsIcon from 'material-ui-icons/Settings'

import TabContainer from './TabContainer'
import SessionTab from './SessionTab'

const styleSheet = createStyleSheet('BasicTabs', theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}))

class SessionTabs extends Component {
  state = {
    index: 0
  }

  handleChange = (event, index) => {
    this.setState({ index })
  }

  onSettingsButtonClick = () => {
    console.log('settings')
  }

  render() {
    const classes = this.props.classes

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Grid container>
            <Grid item xs={11}>
              <Tabs index={this.state.index} onChange={this.handleChange}>
                <Tab label="10.184.11.22" />
                <Tab label="10.184.22.55" />
                <Tab label="10.22.33.87" />
              </Tabs>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={this.onSettingsButtonClick}>
                <Link to="/">
                  <SettingsIcon />
                </Link>
              </IconButton>
            </Grid>
          </Grid>
        </AppBar>
        {this.state.index === 0 &&
          <TabContainer>
            {'Item One'}
          </TabContainer>}
        {this.state.index === 1 &&
          <TabContainer>
            {'Item Two'}
          </TabContainer>}
        {this.state.index === 2 &&
          <TabContainer>
            {'Item Three'}
          </TabContainer>}
      </div>
    )
  }
}

SessionTabs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(SessionTabs)
