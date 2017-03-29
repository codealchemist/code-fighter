import React from 'react'
import Head from 'next/head'
import 'isomorphic-fetch'
import Button from 'react-md/lib/Buttons/Button'
import FontIcon from 'react-md/lib/FontIcons'
import TextField from 'react-md/lib/TextFields'
import Toolbar from 'react-md/lib/Toolbars'
import Page from '../layouts/default'
import defaultPlayer from '../components/players/default'

export default class Player extends React.Component {
  constructor () {
    super()

    this.state = {
      name: '',
      code: defaultPlayer,
      editor: {
        visible: false
      }
    }
    this.state.saveButton = this.getSaveButton()

    this.nav = <Button icon onClick={() => this.closeEditor()}>close</Button>
    this.action = <Button flat label='Save' onClick={() => this.closeEditor()} />
  }

  getInitialState () {
    const defaultState = {
      name: '',
      code: defaultPlayer,
      editor: {
        visible: false
      }
    }
    const state = JSON.parse(localStorage.getItem('Player'))
    return state || defaultState
  }

  restore () {
    console.log('RESTORE')
    this.state = this.getInitialState()
    this.state.saveButton = this.getSaveButton()
    this.setState(this.state)
  }

  saveState () {
    localStorage.setItem('Player', JSON.stringify(this.state))
  }

  static getInitialProps ({ res, xhr }) {
    const statusCode = res ? res.statusCode : (xhr ? xhr.status : null)
    return { statusCode }
  }

  isServer () {
    return this.props.statusCode !== null
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
    this.state.saveButton = this.getSaveButton()
    this.setState(this.state)
    this.saveState()
  }

  save () {
    console.log('save', this.state)
    fetch('http://localhost:3001/player', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        username: this.state.name,
        code: this.state.code
      })
    })
  }

  getSaveButton () {
    if (this.state.name && this.state.code) {
      return (
        <Button raised primary label='Save' onClick={() => this.save()}>
          <FontIcon>save</FontIcon>
        </Button>
      )
    }

    return (
      <Button raised disabled label='Save' onClick={() => this.save()}>
        <FontIcon>save</FontIcon>
      </Button>
    )
  }

  updateName (name) {
    this.state.name = name.trim().replace(/[ =\/\\\?|`'"<>]/, '') // eslint-disable-line
    this.state.saveButton = this.getSaveButton()
    this.setState(this.state)
    this.saveState()
  }

  render () {
    return (
      <div>
        <Head>
          <link href='//fonts.googleapis.com/css?family=Material+Icons' rel='stylesheet' />
        </Head>

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

        <Page>
          <h2>Player</h2>

          <TextField
            id='floatingCenterTitle'
            label='Name'
            style={{margin: 'auto'}}
            lineDirection='center'
            placeholder="Your player's name"
            className='md-cell md-cell--bottom'
            value={this.state.name}
            onChange={(value) => this.updateName(value)}
          />

          <Button raised secondary label='Code Editor' onClick={() => this.openEditor()}>
            <FontIcon>code</FontIcon>
          </Button>

          {this.state.saveButton}
        </Page>
      </div>
    )
  }
}
