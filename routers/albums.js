const express = require('express')
const database = require('../database')

const router = express.Router()

router.get('/:albumID', (request, response, next) => {
  const albumID = request.params.albumID

  database.getAlbumsByID(albumID, (error, albums) => {
    if (error) { return next(error) }

    const params = { filter: 'album_id', filterValue: albumID }

    database.getReviews(params, (error, reviews) => {
      if (error) { return next(error) }

      response.render('album', {
        album: albums[0],
        reviews: reviews,
        windowTitle: 'Album',
        isLoggedIn: request.isLoggedIn
      })
    })
  })
})

module.exports = router
