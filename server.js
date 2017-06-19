require('dotenv').config()

const express = require('express')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const database = require('./database')

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

app.get('/', (request, response) => {
  database.getAlbums((error, albums) => {
    if (error) {
      response.status(500).render('error', {
         error: error,
         windowTitle: 'Error',
         isLoggedIn: request.isLoggedIn
      })
    } else {
      response.render('index', {
        albums: albums,
        windowTitle: 'Home',
        isLoggedIn: request.isLoggedIn
      })
    }
  })
})

app.get('/signin', (request, response) => {
  response.render('signin', {
    error: request.query.error,
    windowTitle: 'Sign In',
    isLoggedIn: request.isLoggedIn
  })
})

app.post('/signin', passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/signin?error=Invalid email or password'
  }
))

app.get('/signout', (request, response) => {
  request.logout()
  response.redirect('/')
})

app.get('/signup', (request, response) => {
  response.render('signup', {
    error: request.query.error,
    windowTitle: 'Sign Up',
    isLoggedIn: request.isLoggedIn
  })
})

app.post('/signup', (request, response) => {
  database.findUserByEmail(request.body, (error, result) => {
    if(error) {
      response.status(500).render('error', {
        error: error,
        windowTitle: 'Error',
        isLoggedIn: request.isLoggedIn
      })
    }
    else if(result.length === 0) {
      database.createUser(request.body, (error, result) => {
        if(error) {
          response.status(500).render('error', {
            error: error,
            windowTitle: 'Error',
            isLoggedIn: request.isLoggedIn
          })
        }
        else {
          response.redirect('/signin?error=Account created, please sign in')
        }
      })
    }
    else {
      response.redirect('/signup?error=Account already exists')
    }
  })
})

app.get('/albums/:albumID', (request, response) => {
  const albumID = request.params.albumID

  database.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', {
        error: error,
        windowTitle: 'Error',
        isLoggedIn: request.isLoggedIn
      })
    } else {
      const album = albums[0]
      response.render('album', {
        album: album,
        windowTitle: 'Album',
        isLoggedIn: request.isLoggedIn
      })
    }
  })
})

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
