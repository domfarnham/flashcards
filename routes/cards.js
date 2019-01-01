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
  console.log(req.params.id)
  const { side } = req.query
  const { id } = req.params

  if (!side) {
    return res.redirect(`/cards/${id}?side=question`)
  }
  const name = req.cookies.username
  const text = cards[id][side]
  const { hint } = cards[id]

  const templateData = { text, side, id, name }

  if (side.toLowerCase() === 'question') {
    templateData.hint = hint
    templateData.sideToShow = 'answer'
    templateData.sideToShowText = 'Answer'
  } else if (side.toLowerCase() === 'answer') {
    templateData.sideToShow = 'question'
    templateData.sideToShowText = 'Question'
  } else {
    res.redirect('/cards')
  }

  res.render('card', templateData)
})

module.exports = router
