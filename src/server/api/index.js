const api = {}

api.mount = app => {
  app.use('/auth', require('./auth'))
  app.use('/session', require('./session'))
}

module.exports = api
