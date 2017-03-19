import React from 'react'
import Link from 'next/link'
import 'isomorphic-fetch'

import Page from '../layouts/default'
import App from '../components/app'

export default class Index extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    return { stars: json.stargazers_count }
  }

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
