import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import HostNode from './hostNode'
import FolderItem from './folderItem'
import axios from 'axios'
import './style.less'
import FolderContextMenu from './folderContextMenu.js'
import HostContextMenu from './hostContextMenu.js'
import classNames from 'classnames'

const ContextMenuType = {
    FOLDER: Symbol('FOLDER'),
    HOST: Symbol('HOST'),
}

const ContextMenuWidth = 160

class TreeView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collapseState: new Map(),
      selectedItemId: '',
      contextMenuProp: {
        show: false,
        type: '',
        left: 0,
        top: 0
      }
    }

    this.addSession = this.addSession.bind(this)
    this.handleContextMenu = this.handleContextMenu.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  addSession(sessionData) {
    axios.post('/api/session', {
      name: sessionData.name,
      hostIP: sessionData.hostIP,
      hostUser: sessionData.hostUser,
      sessionGroupId: sessionData.sessionGroupId
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick)
  }

  handleClick(e) {
    if (e.type === 'contextmenu') return

    e.preventDefault()
    const { showContextMenu } = this.state

    if (showContextMenu && e.target.contains !== this.contextMenu) {
      this.setState({ showContextMenu: false })
    }
  }

  handleContextMenu(event, rowItem) {
    event.preventDefault()

    let contextMenuType
    if(this.isFolder(rowItem)){
      contextMenuType = ContextMenuType.FOLDER
    } else {
      contextMenuType = ContextMenuType.HOST
    }

    const clickX = event.clientX
    const clickY = event.clientY
    const screenW = window.innerWidth
    const screenH = window.innerHeight

    const contextMenuLeft = clickX - ContextMenuWidth
    const contextMenuTop = clickY

    this.setState({
      contextMenuProp: {
        show: true,
        type: contextMenuType,
        left: contextMenuLeft,
        top: contextMenuTop
      }
    })
  }

  handleTreeRowClick(rowItem) {
    if(this.isFolder(rowItem)) {
      this.collapse(rowItem.node._id)
      this.setState({ selectedItemId: rowItem.node._id })
    } else {
      this.setState({ selectedItemId: rowItem._id })
    }
  }

  collapse(id) {
    const collapseState = this.state.collapseState
    const isCollapsed = collapseState.get(id)
    collapseState.set(id, !isCollapsed)
    this.setState({collapseState})
  }

  isFolder(treeItem) {
    return treeItem.children !== undefined
  }

  getTreeRows(data, depth = 1){
    let list = []
    let collapsed = false
    const selectedItemId = this.state.selectedItemId

    data.forEach(rowItem => {
      let rowStyle = { paddingLeft: 12 * depth }
      let itemIsFolder = this.isFolder(rowItem)
      let treeRowContent, rowNodeData

      if(itemIsFolder) {
        rowNodeData = rowItem.node
        collapsed = this.state.collapseState.get(rowNodeData._id)

        treeRowContent = (
            <FolderItem
              addSession={this.addSession}
              name={rowNodeData.name}>
            </FolderItem>
        )
      }
      else {
        // 这里的箭头为 icon.padding-right + 箭头的宽度
        rowStyle.paddingLeft += 20
        rowNodeData = rowItem

        treeRowContent = (
          <HostNode>
            {rowItem.name}
          </HostNode>
        )
      }

      let rowClass = classNames('host-tree-row', {
        folder: itemIsFolder,
        collapsed: collapsed,
        selected: selectedItemId === rowNodeData._id
      })

      list.push(
        <div
          className={rowClass}
          onClick={() => this.handleTreeRowClick(rowItem)}
          onContextMenu={(e) => this.handleContextMenu(e, rowItem)}
          key={rowNodeData._id}
          style={rowStyle}>
          { treeRowContent }
        </div>
      )

      if(itemIsFolder && !collapsed && rowItem.children.size > 0){
        list = list.concat(this.getTreeRows(rowItem.children, depth + 1))
      }
    })

    return list
  }

  getContextMenu() {
    const {
      show,
      type,
      left,
      top
    } = this.state.contextMenuProp

    if(!show) return null

    let contextMenu = null

    if (type === ContextMenuType.FOLDER) {
      contextMenu =
        <FolderContextMenu
          onAddSessionClick={this.onAddSessionClick}
          left={left}
          top={top}>
        </FolderContextMenu>
    } else if (type === ContextMenuType.HOST){
      contextMenu =
        <HostContextMenu
          left={left}
          top={top}>
        </HostContextMenu>
    }

    return contextMenu
  }

  render() {
    const treeRows = this.getTreeRows(this.props.data)
    const contextMenu = this.getContextMenu()

    return (
      <div className="host-tree">
        { contextMenu }
        <div className="host-tree-rows">
          { treeRows }
        </div>
      </div>
    )
  }
}


TreeView.propTypes = {
  data: PropTypes.array,
}

export default DragDropContext(HTML5Backend)(TreeView)
