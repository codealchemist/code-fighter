const {resolve} = require('path')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const config = require('./config')
const fs = require('fs')
const env = process.env.NODE_ENV
const ip = require('ip')
const localIp = ip.address()

// Client.
const clientPort = config.get('PORT') || 9000
const clientUrl = `http://${localIp}:${clientPort}`

// Code Fighter server.
const serverPort = 3000
const serverUrl = config.get('serverUrl') || `http://${localIp}:${serverPort}`

// print ascii art
var artFile = resolve('src/ascii-art.txt')
var art = fs.readFileSync(artFile, 'utf8')
if (env !== 'test') console.log(art)

// Create Express app.
const app = express()

app.disable('etag')
app.set('views', resolve('src/views'))
app.set('view engine', 'ejs')
app.set('trust proxy', true)

// Configure session.
const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: config.get('SECRET') || 'well, this is something',
  signed: true
}
app.use(session(sessionConfig))

// OAuth2
const useAuth = config.get('useAuth')
if (useAuth) {
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(require('./lib/oauth2').router)
}

// Static routes.
app.use(express.static(resolve('src/public')))

// Set routes.
require('./routes')(app, serverUrl)

// Basic 404 handler
app.use((req, res) => {
  // res.status(404).send('Not Found')
  res.render('pages/error', {error: 'PAGE NOT FOUND'})
})

// Basic error handler
app.use((err, req, res, next) => {
  /* jshint unused:false */
  console.error(err)
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.render('pages/error', {error: err.response || err.message || `I don't have much to say, sorry :(`})
  // res.status(500).send(err.response || 'Something broke!')
})

if (module === require.main) {
  // Start the server
  const server = app.listen(clientPort, () => {
    const port = server.address().port
    console.log(`App listening on: ${clientUrl}`)
  })
}

module.exports = app
