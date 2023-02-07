const express = require('express')
const { body, validationResult } = require('express-validator')
const db = require('../utils/db')
const userValidators  = require('../validators/userValidators')

const router = express()
router.use(express.json())

router.get('/', (req, res) => {
    res.send('users home route')
})  

router.post('/create', userValidators.createUser, (req, res) => {
    db.query("select count(*) as count from flashchat.fc_users where fc_user_email='ratikvig@gmail.com'", (err, results) => {
        if(results[0].count == 1){
            res.status(400).send('User already exists')
            return
        }
        res.sendStatus(200)
    })
})

module.exports = router