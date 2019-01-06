const express = require('express')
const router = express.Router()
const { data } = require('../data/flashcardData.json')
const { cards } = data

router.get('/', (req, res, next) => {
  const numberOfCards = cards.length
  const randomId = Math.floor(Math.random() * numberOfCards)
  res.redirect(`/cards/${randomId}?side=question`)
})

router.get('/:id', (req, res, next) => {
  const { side } = req.query
  const { id } = req.params

  if (!side) {
    return res.redirect(`/cards/${id}?side=question`)
  }
  if (typeof (id) !== 'number') {
    const err = new Error('ID is not a number')
    err.status = 400
    return next(err)
  }
  const name = req.cookies.username
  const text = cards[id][side]
  const { hint } = cards[id]

  const templateData = { text, side, id, name }

  if (side.toLowerCase() === 'question') {
    templateData.hint = hint
    templateData.sideToShow = 'answer'
    templateData.sideToShowText = 'Answer'
    return res.render('questionSide', templateData)
  } else if (side.toLowerCase() === 'answer') {
    templateData.sideToShow = 'question'
    templateData.sideToShowText = 'Question'
    return res.render('answerSide', templateData)
  } else {
    res.redirect('/cards')
  }
})

module.exports = router
