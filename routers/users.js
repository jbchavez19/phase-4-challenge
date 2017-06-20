const express = require('express')
const database = require('../database')

const router = express.Router()

router.get('/me', (request, response) => {
  if(request.isLoggedIn) {
    response.redirect(`/users/${request.user.id}`)
  }
  else {
    response.redirect('/')
  }
})

router.get('/:userId', (request, response, next) => {
  const { userId } = request.params


  database.findUserById(userId, (error, result) => {
    if(error) { return next(error) }

    if(result.length === 0) { response.redirect('/') }
    else {
      response.render('profile', {
        windowTitle: 'Profile Page',
        profile: result[0],
        isLoggedIn: request.isLoggedIn
      })
    }
  })
})

module.exports = router
