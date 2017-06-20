const express = require('express')
const database = require('../database')

const router = express.Router()

router.get('/:albumID', (request, response) => {
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

module.exports = router
