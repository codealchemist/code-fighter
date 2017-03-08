function routes (app) {
  // Render index page.
  app.get('/', (req, res) => {
    // Redirect to login page if not already logged in.
    if (!req.user) return res.render('pages/login')

    res.render('pages/index', {user: req.user})
  })

  app.get('/bye', (req, res) => {
    // Redirect to index if logged in.
    if (req.user) return res.render('pages/index', {user: req.user})

    res.render('pages/bye')
  })

  app.get('/play/:level', (req, res) => {
    // Redirect to login page if not already logged in.
    if (!req.user) return res.render('pages/login')

    const level = req.query.level
    res.render(`pages/${level}`)
  })
}

module.exports = routes
