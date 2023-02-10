const express = require('express')

const db = require('../utils/db')
const auth = require('../utils/auth')
const conversationValidators = require('../validators/conversationValidators')
const queries = require('../utils/queries')

const router = express()
router.use(express.json())

router.get('/', (req, res) => {
    res.status(200).send('conversation home route')
})

router.post('/create', auth, conversationValidators.createConversation, (req, res) => {
    const {user1, user2} = req.body
    db.query(queries.createConversation, [user1, user2, Date.now().toISOString()], (err, result) => {
        if(err) throw err
        res.status(200).send({affectedRows: result[0].affectedRows})
    })
})

module.exports = router