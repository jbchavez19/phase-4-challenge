const express = require('express')
const passport = require('passport')
const database = require('../database')
const users = require('./users')
const albums = require('./albums')

const router = express.Router()

router.use('/users', users)
router.use('/albums', albums)

router.get('/', (request, response) => {
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

router.get('/signin', (request, response) => {
  response.render('signin', {
    error: request.query.error,
    windowTitle: 'Sign In',
    isLoggedIn: request.isLoggedIn
  })
})

router.post('/signin', passport.authenticate('local',
  {
    successRedirect: `/users/me`,
    failureRedirect: '/signin?error=Invalid email or password'
  }
))

router.get('/signout', (request, response) => {
  request.logout()
  response.redirect('/')
})

router.get('/signup', (request, response) => {
  response.render('signup', {
    error: request.query.error,
    windowTitle: 'Sign Up',
    isLoggedIn: request.isLoggedIn
  })
})

router.post('/signup', (request, response) => {
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

module.exports = router
