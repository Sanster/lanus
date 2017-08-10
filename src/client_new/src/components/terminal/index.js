import React, { Component } from 'react'
import xterm from 'xterm'
import ActionCable from 'actioncable'
import 'xterm/src/xterm.css'
import './style.css'

class Terminal extends Component {
  constructor(props) {
    super(props)
    console.log('terminal constructor')
  }

  componentDidMount() {
    console.log('terminal componentDidMount')
    xterm.loadAddon('fit')

    var term = new xterm({
      cursorBlink: true
    })

    term.open(this.termDiv)
    term.fit()

    var RailsCable = {}

    RailsCable.cable = ActionCable.createConsumer(
      `ws://localhost:28080?token=${sessionStorage.jwt}`
    )

    RailsCable.cable.subscriptions.create('SessionChannel', {
      connected() {
        console.log('Cable connected')
      },
      disconnected() {},
      rejected() {
        console.log('subscription is rejected')
      },
      received(data) {}
    })
    // socket = io.connect()

    // socket.on('connect', () => {
    //   socket.emit('terminal resize', term.cols, term.rows)

    //   term.on('data', data => {
    //     socket.emit('data', data)
    //   })

    //   socket.on('data', data => {
    //     term.write(data)
    //   })

    //   socket.on('disconnect', function(err) {
    //     socket.io.reconnection(false)
    //   })

    //   socket.on('error', function(err) {
    //     console.error(err)
    //   })
    // })
  }

  render() {
    return (
      <div className="terminal-container">
        <div
          className="terminal"
          ref={div => {
            this.termDiv = div
          }}
        />
      </div>
    )
  }
}

export default Terminal
