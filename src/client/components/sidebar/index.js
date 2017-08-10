import React, { Component } from 'react'
import './style.less'
import classNames from 'classnames'

class SidebarMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      visible,
      children,
     } = this.props

    const classes = classNames('sidebar', { visible: visible })

    return (
      <div className={classes}>
        { children }
      </div>
    )
  }
}

export default SidebarMenu
