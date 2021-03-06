import React from 'react'
import Arena from './arena.js'
import MDSpinner from 'react-md-spinner'
import Store from '../components/store'

export default class App extends React.Component {
  constructor () {
    super()

    this.serverStore = new Store('server')

    // Create arena adding players to it.
    this.arena = new Arena()

    this.spinnerStyle = {
      zIndex: 1000,
      position: 'absolute'
    }

    this.frames = []
    this.fps = 16

    // Set view states.
    this.view = {
      connecting: (
        <MDSpinner userAgent='Gecko' size={30} className='abs-center' style={this.spinnerStyle} />
      ),
      connected: (<div />)
    }

    // Default view state.
    this.state = {
      content: this.view.connecting
    }
  }

  componentDidMount () {
    this.init()
  }

  componentWillUnmount () {
    this.arena.quit()
  }

  render () {
    return this.state.content
  }

  init () {
    this.initSocket()
    this.initFrameLoader(this.fps)
    this.arena.init()
    console.log('[ APP ]--> INIT')
  }

  setConnectionGuid (guid) {
    this.state.connectionGuid = guid
    this.setState(this.state)
    this.props.updateConnectionGuid(guid)
  }

  setError (error) {
    // TODO
    this.error = error
  }

  initSocket () {
    const server = this.serverStore.get() || {serverUrl: null}
    const serverUrl = server.serverUrl || '//localhost:3001'
    console.log('--  server url: ', serverUrl)
    const socket = io(serverUrl)

    socket.on('event', (data) => {})
    socket.on('disconnect', () => {})
    socket.on('connect', () => {
      console.log('-- server connected')
      this.setConnected()
    })

    socket.on('handshake', (guid) => {
      console.log('-- got handshake', guid)
      this.setConnectionGuid(guid)
    })

    socket.on('player_error', (error) => {
      console.log('-- got error', error)
      this.setError(error)
    })

    socket.on('update_finish', (data) => {
      this.frames = this.frames.concat(JSON.parse(data))
    })

    socket.on('event', (data) => {
      console.log('event')
    })

    socket.on('disconnect', () => {
      console.log('disconnect')
      this.setConnecting()
    })
  }

  initFrameLoader (fps) {
    setInterval(() => {
      if (this.frames.length > 0) {
        const frame = this.frames.shift()
        this.arena.setElements(frame)

        // console.log(this.frames.length)
      }
    }, fps)
  }

  setConnected () {
    this.setState({
      content: this.view.connected
    })
  }

  setConnecting () {
    this.setState({
      content: this.view.connecting
    })
  }
}
