require('dotenv').config()

const express = require('express')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const database = require('./database')

passport.use(new LocalStrategy(
  function(username, password, callback) {
    database.findUserByUsername({ username: username }, function(error, user) {
      if(error) {
        return callback(error)
      }

      if(!user[0]) {
        return callback(null, false, { message: 'Incorrect username.' })
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

app.get('/', (request, response) => {
  console.log(request.user)
  database.getAlbums((error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      response.render('index', { albums: albums })
    }
  })
})

app.get('/signin', (request, response) => {
  response.render('signin', { error: request.query.error})
})

app.post('/signin', passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/signin?error=Invalid username or password'
  }
))

app.get('/signout', (request, response) => {
  request.logout()
  response.redirect('/')
})

app.get('/albums/:albumID', (request, response) => {
  const albumID = request.params.albumID

  database.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      const album = albums[0]
      response.render('album', { album: album })
    }
  })
})

app.use((request, response) => {
  response.status(404).render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
