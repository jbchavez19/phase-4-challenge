const express = require('express')
const database = require('../database')

const router = express.Router()

router.get('/:albumID/review', (request, response) => {
  if(request.isLoggedIn) {
    const albumTitle = request.query.title

    response.render('new_review', {
      windowTitle: 'New Review',
      album: { title: albumTitle },
      isLoggedIn: request.isLoggedIn
    })
  }
  else {
    response.redirect('/signin?error=You need to be signed in to post a review')
  }
})

router.post('/:albumID/review', (request, response, next) => {
  if(request.isLoggedIn) {
    const albumID = request.params.albumID
    const params = {
      albumId: albumID,
      userId: request.user.id,
      review: request.body.review
    }

    database.createReview(params, (error, result) => {
      if(error) { return next(error) }

      response.redirect(`/albums/${albumID}`)
    })
  }
  else {
    response.redirect('/')
  }
})

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
