const {resolve} = require('path')
const nconf = require('nconf')
nconf.set('credentials', false)

let credentials
try {
  credentials = require(resolve('credentials.json'))

  // Set defaults.
  nconf.defaults({
    'SECRET': 'a random phrase used to set session storage',
    'OAUTH2_CLIENT_ID': credentials.web.client_id,
    'OAUTH2_CLIENT_SECRET': credentials.web.client_secret,
    'OAUTH2_CALLBACK': '/auth/google/callback',
    'PORT': 9001
  })
  nconf.set('credentials', true)
} catch (e) {}

nconf
  .argv()
  .env()
  .file({file: resolve('package.json')})

module.exports = nconf
