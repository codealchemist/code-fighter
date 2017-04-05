import React from 'react'
import Button from 'react-md/lib/Buttons/Button'
import FontIcon from 'react-md/lib/FontIcons'
import Toolbar from 'react-md/lib/Toolbars'
import Store from '../components/store'
import 'isomorphic-fetch'
import defaultPlayer from '../components/players/default'

export default class CodeEditor extends React.Component {
  constructor (props) {
    super(props)
    this.props = props

    this.store = new Store('code-editor')
    this.serverStore = new Store('server')
    this.state = {
      code: defaultPlayer,
      color: 'blue',
      editor: {
        visible: false
      }
    }

    this.nav = <Button icon onClick={() => this.closeEditor()}>close</Button>
    this.action = <Button flat label='Save' onClick={() => this.save()} />
  }

  getInitialState () {
    const defaultState = {
      code: defaultPlayer,
      color: 'blue',
      editor: {
        visible: false
      }
    }
    const state = this.store.get()
    return state || defaultState
  }

  restore () {
    console.log('RESTORE')
    this.state = this.getInitialState()
    this.setState(this.state)
  }

  saveState () {
    this.store.set(this.state)
  }

  static getInitialProps ({ res, xhr }) {
    const statusCode = res ? res.statusCode : (xhr ? xhr.status : null)
    return { statusCode }
  }

  componentDidMount () {
    this.initEditor()
    this.restore()
  }

  initEditor () {
    setTimeout(() => {
      this.editor = ace.edit('editor')
      this.editor.setTheme('ace/theme/monokai')
      this.editor.getSession().setMode('ace/mode/javascript')
      this.editor.$blockScrolling = 'Infinity'
      this.editor.setValue(this.state.code || '')
    })
  }

  openEditor () {
    if (!this.editor) this.initEditor()
    this.state.editor.visible = true
    this.setState(this.state)
    this.saveState()
  }

  closeEditor () {
    this.state.editor.visible = false
    this.state.code = this.editor.getValue()
    this.setState(this.state)
    this.saveState()
  }

  save () {
    this.state.code = this.editor.getValue()
    this.setState(this.state)
    this.saveState()

    const server = this.serverStore.get() || {serverUrl: null}
    console.log('- server', server)
    const serverUrl = server.serverUrl || '//localhost:3001'

    console.log('-- save, STATE', this.state)
    console.log('-- save, PROPS: ', this.props)
    console.log('-- GUID: ', server.guid)
    if (!this.state.code || !this.props.username || !server.guid) {
      console.error('ERROR: code, name and guid must be set!')
      return
    }

    fetch(`${serverUrl}/player`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.props.username,
        code: this.state.code,
        color: this.props.color,
        guid: server.guid
      })
    })
  }

  getButton () {
    let label = 'Code Editor'
    let className = 'code-editor-btn'
    if (this.props.icon !== undefined) {
      label = ''
      className += ' icon-button tr-button'
    }

    if (this.props.username) {
      return (
        <Button
          className={className}
          raised secondary
          label={label}
          onClick={() => this.openEditor()}
        >
          <FontIcon>code</FontIcon>
        </Button>
      )
    }

    return (
      <Button
        className={className}
        raised disabled secondary
        label={label}
        onClick={() => this.openEditor()}
      >
        <FontIcon>code</FontIcon>
      </Button>
    )
  }

  render () {
    return (
      <span>
        <div className={this.state.editor.visible ? '' : 'hidden'}>
          <Toolbar
            colored
            nav={this.nav}
            actions={this.action}
            style={{zIndex: 300}}
            title='Code Editor'
            fixed
          />
          <div id='editor' />
        </div>

        {this.getButton()}
      </span>
    )
  }
}
