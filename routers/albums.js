const express = require('express')
const database = require('../database')

const router = express.Router()

router.get('/:albumID/review', (request, response) => {
  const albumID = request.params.albumID
  const albumTitle = request.query.title

  response.render('new_review', {
    windowTitle: 'New Review',
    album: { title: albumTitle },
    isLoggedIn: request.isLoggedIn
  })
})

router.post('/:albumID/review', (request, response, next) => {
  response.send(request.body)
})

router.get('/:albumID', (request, response, next) => {
  const albumID = request.params.albumID

  database.getAlbumsByID(albumID, (error, albums) => {
    if (error) { return next(error) }

    const reviewParams = { albumId: albumID, limit: null }
    database.getReviews(reviewParams, (error, reviews) => {
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
