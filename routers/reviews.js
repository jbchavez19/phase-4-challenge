const express = require('express')
const database = require('../database')

const router = express.Router()

router.post('/:reviewId/delete', (request, response, next) => {
  if (request.isLoggedIn) {
    const reviewId = request.params.reviewId
    const params = { filter: 'reviews.id', filterValue: reviewId }

    database.getReviews(params, (error, reviews) => {
      if (error) { return next(error) }

      if(reviews.length === 1) {
        if(reviews[0].author_id === request.user.id) {
          database.deleteReview(reviewId, (error, result) => {
            if (error) { return next(error) }

            response.status(200).send()
          })
        }
        else {
          response.status(401).send()
        }
      }
      else {
        response.status(400).send()
      }
    })
  }
  else {
    response.status(403).send()
  }
})

router.post('/album/:albumId/post', (request, response, next) => {
  if (request.isLoggedIn) {
    if(request.body.review && request.body.review.length > 0) {
      const albumId = request.params.albumId
      const params = {
        albumId: albumId,
        userId: request.user.id,
        review: request.body.review
      }

      database.createReview(params, (error, result) => {
        if (error) { return next(error) }

        response.redirect(`/albums/${albumId}`)
      })
    }
    else {
      response.status(400).send()
    }
  }
  else {
    response.status(403).send()
  }
})

router.get('/album/:albumId', (request, response) => {
  if (request.isLoggedIn) {
    const albumId = request.params.albumId
    const albumTitle = request.query.title

    response.render('new_review', {
      windowTitle: 'New Review',
      album: { id: albumId, title: albumTitle },
      isLoggedIn: request.isLoggedIn
    })
  }
  else {
    response.redirect('/signin?error=You need to be signed in to post a review')
  }
})

module.exports = router
