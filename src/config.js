const {resolve} = require('path')
const nconf = require('nconf')
let credentials
try {
  credentials = require(resolve('credentials.json'))
} catch (e) {
  console.log(`ERROR: Credentials not found.
    Goto https://console.developers.google.com, 
    download the credentials file for your project
    and store it as credentials.json in the root
    folder of this app.
  `)
  process.exit()
}

nconf
  .argv()
  .env()
  .file({file: resolve('package.json')})

// Set defaults.
nconf.defaults({
  'SECRET': 'a random phrase used to set session storage',
  'OAUTH2_CLIENT_ID': credentials.web.client_id,
  'OAUTH2_CLIENT_SECRET': credentials.web.client_secret,
  'OAUTH2_CALLBACK': '/auth/google/callback',
  'PORT': 9001
})

module.exports = nconf
