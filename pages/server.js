import React from 'react'
import Head from 'next/head'
import TextField from 'react-md/lib/TextFields'
import Page from '../layouts/default'
import Store from '../components/store'

export default class Player extends React.Component {
  constructor () {
    super()

    this.state = {
      serverUrl: 'htpp://localhost:3001'
    }
    this.store = new Store()
  }

  getInitialState () {
    const defaultState = {
      serverUrl: 'htpp://localhost:3001'
    }
    const state = JSON.parse(this.store.get('server'))
    return state || defaultState
  }

  restore () {
    console.log('RESTORE')
    this.state = this.getInitialState()
    this.setState(this.state)
  }

  saveState () {
    this.store.set('server', JSON.stringify(this.state))
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
        </Page>
      </div>
    )
  }
}
