import Head from 'next/head'

export default ({ children, title = 'Code Fighter' }) => (
  <div>
    <Head>
      <meta name='description' content='Fight against other developters commanding your hero with JavaScript!' />
      <meta name='author' content='Alberto Miranda <b3rt.js@gmail.com>' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>{ title }</title>

      { /* open graph */ }
      <meta property='og:title' content='Google Permissions' />
      <meta property='og:site_name' content='Google Permissions' />
      <meta property='og:type' content='article' />
      <meta property='og:description' content='Fight against other developters commanding your hero with JavaScript!' />
      { /* <meta property='og:url' content='TODO' /> */ }
      { /* <meta property='og:image' content='TODO' /> */ }
      { /* <link rel='image_src' href='TODO' /> */ }

      { /* Icons */ }
      <link rel='apple-touch-icon' href='apple-touch-icon.png' />
      { /* Place favicon.ico in the root directory */ }

      { /* Google Fonts */ }
      <link href='//fonts.googleapis.com/css?family=Raleway' rel='stylesheet' />
      <link href='//fonts.googleapis.com/css?family=Dancing+Script' rel='stylesheet' />

      { /* Library Styles */ }
      <link href='//alertifyjs.com/build/css/alertify.css' rel='stylesheet' />

      { /* Library JS */ }
      <script src='//cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js' />

      { children }
    </Head>
  </div>
)
