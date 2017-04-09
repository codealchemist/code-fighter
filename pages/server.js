import React from 'react'
import Head from 'next/head'
import TextField from 'react-md/lib/TextFields'
import FontIcon from 'react-md/lib/FontIcons'
import Button from 'react-md/lib/Buttons/Button'
import MDSpinner from 'react-md-spinner'
import Page from '../layouts/default'
import Store from '../components/store'

export default class Player extends React.Component {
  constructor () {
    super()

    this.state = {
      serverUrl: 'htpp://localhost:3001',
      connected: false,
      connecting: false,
      guid: null
    }
    this.store = new Store('server')
  }

  getInitialState () {
    const defaultState = {
      serverUrl: 'http://localhost:3001',
      connected: false,
      connecting: false,
      guid: null
    }
    const state = this.store.get()
    return state || defaultState
  }

  restore () {
    console.log('RESTORE')
    this.state = this.getInitialState()
    this.setState(this.state)

    // Reconnect socket if it was previously connected.
    if (this.state.connected || this.state.connecting) {
      this.initSocket()
    }
  }

  saveState () {
    this.store.set(this.state)
  }

  static getInitialProps ({ res, xhr }) {
    const statusCode = res ? res.statusCode : (xhr ? xhr.status : null)
    return { statusCode }
  }

  isServer () {
    return this.props.statusCode !== null
  }

  componentDidMount () {
    this.restore()
  }

  updateServerUrl (serverUrl) {
    this.state.serverUrl = serverUrl.trim().replace(/[ =\\\?|`'"<>]/, '') // eslint-disable-line
    this.setState(this.state)
    this.saveState()
  }

  setGuid (guid) {
    this.state.guid = guid
    this.setState(this.state)
    this.saveState()
  }

  initSocket () {
    console.log('--  CONNECT SERVER / URL: ', this.state.serverUrl)
    this.state.connecting = true
    this.setState(this.state)
    this.saveState()

    this.socket = io(this.state.serverUrl)

    this.socket.on('event', (data) => {})
    this.socket.on('disconnect', () => {})
    this.socket.on('connect', () => {
      console.log('-- server connected')
      this.state.connecting = false
      this.state.connected = true
      this.setState(this.state)
      this.saveState()
    })

    this.socket.on('handshake', (guid) => {
      console.log('-- got handshake', guid)
      this.setGuid(guid)
    })

    this.socket.on('player_error', (error) => {
      console.log('-- got error', error)
      // this.setError(error)
    })

    this.socket.on('disconnect', () => {
      console.log('disconnect')
      this.state.connecting = false
      this.state.connected = false
      this.setState(this.state)
      this.saveState()
    })
  }

  connect () {
    this.initSocket()
  }

  disconnect () {
    this.socket.disconnect()
  }

  getButton () {
    if (this.state.connecting) {
      return (
        <MDSpinner userAgent='Gecko' size={30} className='abs-center' />
      )
    }

    if (this.state.connected) {
      return (
        <Button
          raised secondary
          label='Disconnect'
          onClick={() => this.disconnect()}
        >
          <FontIcon>wifi</FontIcon>
        </Button>
      )
    }

    return (
      <Button
        raised primary
        label='Connect'
        onClick={() => this.connect()}
      >
        <FontIcon>wifi</FontIcon>
      </Button>
    )
  }

  render () {
    return (
      <div>
        <Head>
          <link href='//fonts.googleapis.com/css?family=Material+Icons' rel='stylesheet' />
        </Head>

        <Page>
          <h2>Server</h2>

          <TextField
            id='floatingCenterTitle'
            label='Server URL'
            style={{margin: 'auto'}}
            lineDirection='center'
            placeholder='code-fighter-server url'
            className='md-cell md-cell--bottom'
            value={this.state.serverUrl}
            onChange={(value) => this.updateServerUrl(value)}
          />

          {this.getButton()}
        </Page>
      </div>
    )
  }
}
