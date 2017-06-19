const express = require('express')

const router = express.Router()

router.get('/profile', (request, response) => {
  response.send('Profile')
})

module.exports = router
