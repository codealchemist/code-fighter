import El from './el.js'
import Arena from './arena.js'
import Ship from './ship.js'

export default class App {
  constructor () {
    // Elements.
    this.$arena = new El('arena')
    this.$loading = new El('loading')
    this.$welcome = new El('welcome')
    this.$openEditorButton = new El('open-editor-button')
    this.$editorContainer = new El('editor-container')
    this.$showPlayersListButton = new El('show-players-list-button')
    this.$playersList = new El('players-list')
    this.$viewButton = new El('view-button')
    this.$playButton = new El('play-button')
    this.$newPlayerName = new El('new-player-name')
    this.$openPlayerEditorButton = new El('open-player-editor-button')
    this.$closePlayersListButton = new El('close-players-list-button')
    this.$editor = new El('editor')

    this.minPlayerNameChars = 3

    // Code editor.
    this.initEditor()

    // Create arena adding players to it.
    this.arena = new Arena()

    this.setEvents()
  }

  initEditor () {
    this.editor = ace.edit('editor')
    this.editor.setTheme('ace/theme/monokai')
    this.editor.getSession().setMode('ace/mode/javascript')
    this.editor.insert(`// Write your bot's JavaScript code here\n`)
    this.editor.gotoLine(1)
    this.editor.setShowPrintMargin(false)
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
    // Play.
    bean.on(this.$playButton.get(), 'click', (e) => {
      console.log('PLAY!')
      this.$welcome.hide()
      this.arena.init()
    })

    // View the fight.
    bean.on(this.$viewButton.get(), 'click', (e) => {
      console.log('View mode')
      this.$welcome.hide()
      this.arena.init()
    })

    // View players list.
    bean.on(this.$showPlayersListButton.get(), 'click', (e) => {
      this.$welcome.hide()
      this.$playersList.show()
      this.$newPlayerName.focus()
    })

    // Open editor.
    bean.on(this.$openEditorButton.get(), 'click', (e) => {
      this.$welcome.hide()
      this.$editorContainer.show()
    })

    // Open player editor. Opens from the players list.
    bean.on(this.$openPlayerEditorButton.get(), 'click', (e) => {
      this.currentPlayerName = this.$newPlayerName.val().trim()
      if (!this.currentPlayerName) {
        alertify.error('Player name is required.')
        return
      }

      if (this.currentPlayerName.length < this.minPlayerNameChars) {
        alertify.error(`Player name must have at least ${this.minPlayerNameChars} chars.`)
        return
      }

      // this.$playersList.hide()
      this.$editorContainer.show()
    })

    bean.on(this.$closePlayersListButton.get(), 'click', (e) => {
      this.$playersList.hide()
      this.$welcome.show()
    })

    // Show hide editor on ESC.
    bean.on(document, 'keyup', (e) => {
      if (e.keyCode === 27) {
        if (this.$editorContainer.isVisible()) {
          this.$editorContainer.hide()
          const code = this.editor.getValue()

          try {
            const CustomPlayer = eval(code) // eslint-disable-line
            const customPlayer = new CustomPlayer()
            const customShip = new Ship({
              diameter: 40,
              name: this.currentPlayerName,
              color: 'yellow',
              player: customPlayer
            })

            if (this.currentShipId) {
              this.arena.changeShip(this.currentShipId, customShip)
              return
            }

            this.currentShipId = this.arena.addShip(customShip)
          } catch (e) {
            alertify.error(e.message)
          }

          return
        }

        this.$editorContainer.show()
      }
    })
  }

}
