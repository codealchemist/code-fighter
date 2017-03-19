import React from 'react'
import Arena from './arena.js'

export default class App extends React.Component {
  constructor () {
    super()

    // Create arena adding players to it.
    this.arena = new Arena()

    this.frames = []
    this.fps = 16
  }

  componentDidMount () {
    this.init()
  }

  render () {
    return (
      <div />
    )
  }

  init () {
    this.initSocket()
    this.initFrameLoader(this.fps)
    this.arena.init()
    console.log('[ APP ]--> INIT')
  }

  initSocket () {
    const serverUrl = '//localhost:3001'
    const socket = io(serverUrl)
    socket.on('connect', () => {})
    socket.on('event', (data) => {})
    socket.on('disconnect', () => {})
    socket.on('connect', () => {
      console.log('connect')
    })

    socket.on('update_finish', (data) => {
      this.frames = this.frames.concat(JSON.parse(data))
    })

    socket.on('event', (data) => {
      console.log('event')
    })

    socket.on('disconnect', () => {
      console.log('disconnect')
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
}
