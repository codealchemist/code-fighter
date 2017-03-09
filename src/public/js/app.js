import El from './el.js'
import Arena from './arena.js'

export default class App {
  constructor () {
    // Elements.
    this.$arena = new El('arena')
    this.$play = new El('play')
    this.$loading = new El('loading')
    this.$welcome = new El('welcome')

    // Create arena adding players to it.
    this.arena = new Arena()

    this.setEvents()
  }

  getParameterByName (name, url) {
    if (!url) {
      url = window.location.href
    }
    name = name.replace(/[[\]]/g, '\\$&')
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    const results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }

  saveSession (name) {
    window.localStorage.name = name
  }

  deleteSession (name) {
    delete window.localStorage.name
  }

  restoreSession () {
    const name = window.localStorage.name
    if (!name) return

    console.log(`- restoring session for ${name}`)
    this.deleteSession(name)
    if (name) this.loadLunch(name)
  }

  setEvents () {
    bean.on(this.$play.get(), 'click', (e) => {
      console.log('PLAY!')
      this.$welcome.hide()
      this.arena.init()
    })

    // Show hide console on ESC.
    bean.on(document, 'keyup', (e) => {
      if (e.keyCode === 27) {
        // TODO
      }
    })
  }

}
