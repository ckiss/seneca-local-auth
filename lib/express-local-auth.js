var Passport_local = require('passport-local')
var LocalStrategy = Passport_local.Strategy

module.exports = function (options) {
  var seneca = this
  var service = 'local'

  var authPlugin = new LocalStrategy(
    function (username, password, done) {
      seneca.act({role: 'user', cmd: 'login', nick: username, email: username, password: password},
        function (err, out) {
          if (err) {
            return done(err)
          }
          if (!out.ok) {
            return done(out.why)
          }
          done(err, out)
        })
    }
  )

  seneca.act({role: 'auth', cmd: 'register_service', service: service, plugin: authPlugin, conf: options})

  return {
    name: 'local-auth'
  }
}

