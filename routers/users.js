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

router.get('/:userId', (request, response) => {
  const { userId } = request.params

  database.findUserById(userId, (error, result) => {
    if(error || result.length === 0) {
      if(!error) {
        error = new Error('User does not exist')
      }
      response.status(500).render('error', {
         error: error,
         windowTitle: 'Error',
         isLoggedIn: request.isLoggedIn
      })
    }
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
