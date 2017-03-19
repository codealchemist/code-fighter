import React from 'react'
import Link from 'next/link'
import 'isomorphic-fetch'
import Page from '../layouts/default'

export default class Index extends React.Component {
  componentDidMount () {
    // alertify.success('Hey! Cool!')
  }

  render () {
    return (
      <div>
        <Page>
          <h2>Welcome!</h2>
          <p>
            In <b>Code Fighter</b> you will be able to challenge other
            developers by coding your own bot in JavaScript.
          </p>
          <p>
            Your bot is an ES6 class with an 'update' method.
          </p>
          <p>
            This 'update' method will be called before each rendering cycle
            affecting the app state.
          </p>
          <p>
            Read our <Link href='/tutorial'>tutorial</Link> to learn more.
          </p>

          <p>
            Or just <Link href='/arena'>open the arena</Link> to see how bots fight each other!
          </p>
        </Page>
      </div>
    )
  }
}
