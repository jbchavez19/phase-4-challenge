const express = require('express')
const database = require('../database')

const router = express.Router()

router.get('/:albumID', (request, response, next) => {
  const albumID = request.params.albumID

  database.getAlbumsByID(albumID, (error, albums) => {
    if (error) { return next(error) }

    const album = albums[0]
    response.render('album', {
      album: album,
      windowTitle: 'Album',
      isLoggedIn: request.isLoggedIn
    })
  })
})

module.exports = router
