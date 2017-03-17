function routes (app, serverUrl) {
  // Render index page.
  app.get('/', (req, res) => {
    res.render('pages/index', {
      user: req.user || null,
      serverUrl
    })
  })

  // app.get('/socket', (req, res) => {
  //   var socket = require('socket.io-client')('http://localhost:3000', { 'forceNew': true });

  //   socket.on('connect', function(){
  //     console.log('connect')
  //     res.write('connect')
  //   });
  //   socket.on('update_finish', function(data) {
  //     console.log(data)
  //     res.write(data)
  //   });
  //   socket.on('event', function(data) {
  //     console.log('event')
  //     res.write('event')
  //   });
  //   socket.on('disconnect', function() {
  //     console.log('disconnect')
  //     res.write('disconnect')
  //   });

  // })

  app.get('/login', (req, res) => {
    res.render('pages/login')
  })

  app.get('/bye', (req, res) => {
    // Redirect to index if logged in.
    if (req.user) return res.render('pages/index', {user: req.user})

    res.render('pages/bye')
  })
}

module.exports = routes
