const express = require('express')
const passport = require('passport')
const database = require('../database')
const users = require('./users')
const albums = require('./albums')

const router = express.Router()

router.use('/users', users)
router.use('/albums', albums)

router.get('/', (request, response, next) => {
  if (request.isLoggedIn) {
    database.getAlbums((error, albums) => {
      if (error) { return next(error) }

      database.getMostRecentReviews(3, (error, reviews) => {
        if (error) { return next(error) }

        response.render('index', {
          albums: albums,
          reviews: reviews,
          windowTitle: 'Home',
          isLoggedIn: request.isLoggedIn
        })
      })
    })
  }
  else {
    response.render('splash', {
      windowTitle: 'Splash',
      isLoggedIn: request.isLoggedIn
    })
  }

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

router.post('/signup', (request, response, next) => {
  database.findUserByEmail(request.body, (error, result) => {
    if (error) { return next(error) }

    if (result.length === 0) {
      database.createUser(request.body, (error, result) => {
        if (error) { return next(error) }

        response.redirect('/signin?error=Account created, please sign in')
      })
    }
    else {
      response.redirect('/signup?error=Account already exists')
    }
  })
})

module.exports = router
