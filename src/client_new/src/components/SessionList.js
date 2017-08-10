import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles, createStyleSheet } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import AppBar from 'material-ui/AppBar'
import Checkbox from 'material-ui/Checkbox'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table'

const styleSheet = createStyleSheet('SessionsList', theme => ({
  table: {
    width: '60%',
    margin: 'auto'
  }
}))

let id = 0
function createData(name, ip, user) {
  id += 1
  return { id, name, ip, user }
}

const data = [
  createData('10.184.22.33', '10.184.22.33', 'Tony'),
  createData('15.24.23.56', '15.24.23.56', 'cwq'),
  createData('10.23.44.55', '10.23.44.55', 'Test')
]

class SessionList extends Component {
  constructor() {
    super()

    this.state = {
      selected: []
    }
  }

  isSelected = id => {
    return this.state.selected.indexOf(id) !== -1
  }

  onSelectAllClick = () => {}

  handleRowClick = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    this.setState({ selected: newSelected })
  }

  render() {
    const classes = this.props.classes
    return (
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell checkbox>
                <Checkbox onChange={this.onSelectAllClick} />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Ip</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              const isSelected = this.isSelected(n.id)
              console.log(isSelected)
              return (
                <TableRow
                  key={n.id}
                  hover
                  selected={isSelected}
                  onClick={event => this.handleRowClick(event, n.id)}
                >
                  <TableCell checkbox>
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell>
                    {n.name}
                  </TableCell>
                  <TableCell>
                    {n.ip}
                  </TableCell>
                  <TableCell>
                    {n.user}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default withStyles(styleSheet)(SessionList)
