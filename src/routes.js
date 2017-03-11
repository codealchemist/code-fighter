function routes (app) {
  // Render index page.
  app.get('/', (req, res) => {
    res.render('pages/index', {user: req.user || null})
  })

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
