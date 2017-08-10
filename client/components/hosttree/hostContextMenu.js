import React, { Component } from 'react'
import './style.less'

class HostContextMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      left,
      top
    } = this.props

    const style = {
      left,
      top
    }

    return (
      <div className="context-menu" style={style}>
        <div className="context-menu-option">Delete</div>
        <div className="context-menu-option">Properity</div>
      </div>
    )
  }
}

export default HostContextMenu