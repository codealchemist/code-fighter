import React from 'react'
import Page from '../layouts/default'
import App from '../components/app'
import Store from '../components/store'
import CodeEditor from '../components/code-editor'

export default class Index extends React.Component {
  constructor () {
    super()
    this.state = {
      username: null
    }
    this.playerStore = new Store('player')
  }

  componentDidMount () {
    const username = this.playerStore.get('username')
    this.state.username = username
    this.setState(this.state)
  }

  updateConnectionGuid (guid) {
    console.log('- ARENA: updating connection guid:', guid)
    this.state.connectionGuid = guid
    this.setState(this.state)
  }

  render () {
    return (
      <div>
        <Page>
          <CodeEditor
            username={this.state.username}
            connectionGuid={this.state.connectionGuid}
            icon
          />

          <App updateConnectionGuid={(guid) => this.updateConnectionGuid(guid)} />
        </Page>
      </div>
    )
  }
}
