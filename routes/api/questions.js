const express = require('express');
const router = express.Router();

const Question = require('../../models/question')

router.get('/', (req, res) => {
    Question.find()
        .then(questions => res.json(questions))
            .catch(err => res.status(404).json(err))
});

router.post('/', (req, res) => {
    const newQuestion = new Question({
        name: req.body.name,
        content: req.body.content
    })

    newQuestion.save().then(question => res.json(question))
        .catch(err => res.status(404).json(err))
})

module.exports = router