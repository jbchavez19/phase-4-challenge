require('dotenv').config()

const express = require('express')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const database = require('./database')
const routers = require('./routers')

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, callback) {
    database.findUserByEmail({ email: email }, function(error, user) {
      if(error) {
        return callback(error)
      }

      if(!user[0]) {
        return callback(null, false, { message: 'Incorrect email.' })
      }

      if(user[0].password != password) {
        return callback(null, false, { message: 'Incorrect password.' })
      }

      return callback(null, user[0])
    })
  }
))

passport.serializeUser(function(user, callback) {
  callback(null, user.id)
})

passport.deserializeUser(function(id, callback) {
  database.findUserById(id, function(error, user) {
    if(error) { return callback(error) }
    if(user.length === 0) { return callback(null, null) }
    callback(null, user[0])
  })
})

const app = express()

require('ejs')
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY]
}))
app.use(passport.initialize())
app.use(passport.session())
app.use((request, response, next) => {
  request.isLoggedIn = request.user ? true : false
  next()
})
app.use('/', routers)

app.use((request, response) => {
  response.status(404).render('not_found', {
    windowTitle: '404 Not Found',
    isLoggedIn: request.isLoggedIn
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
