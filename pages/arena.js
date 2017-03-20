import React from 'react'
import 'isomorphic-fetch'

import Page from '../layouts/default'
import App from '../components/app'

export default class Index extends React.Component {
  render () {
    return (
      <div>
        <Page>
          <App />
        </Page>
      </div>
    )
  }
}
