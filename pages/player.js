import React from 'react'
import Head from 'next/head'
import FontIcon from 'react-md/lib/FontIcons'
import TextField from 'react-md/lib/TextFields'
import Page from '../layouts/default'
import Store from '../components/store'
import CodeEditor from '../components/code-editor'

export default class Player extends React.Component {
  constructor () {
    super()

    this.state = {
      username: ''
    }

    this.store = new Store('player')
  }

  getInitialState () {
    const defaultState = {
      username: ''
    }
    const state = this.store.get()
    console.log('- player initial state:', state)
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

  isServer () {
    return this.props.statusCode !== null
  }

  componentDidMount () {
    this.restore()
  }

  updateUsername (username) {
    this.state.username = username.trim().replace(/[ =\/\\\?|`'"<>]/, '') // eslint-disable-line
    this.setState(this.state)
    this.saveState()
  }

  render () {
    return (
      <div>
        <Head>
          <link href='//fonts.googleapis.com/css?family=Material+Icons' rel='stylesheet' />
        </Head>

        <Page>
          <h2>Player</h2>

          <TextField
            id='floatingCenterTitle'
            label='Name'
            style={{margin: 'auto'}}
            lineDirection='center'
            placeholder="Your player's name"
            className='md-cell md-cell--bottom'
            value={this.state.username}
            onChange={(value) => this.updateUsername(value)}
          />

          <CodeEditor username={this.state.username} />
        </Page>
      </div>
    )
  }
}
