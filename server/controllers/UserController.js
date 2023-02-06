const express = require('express')

const db = require('../utils/db')


const router = express()

router.get('/', (req, res) => {
    res.send('users home route')
})

router.post('/create', (req, res) => {
    try{
        db.query(
            "Insert into flashchat.fc_users(fc_user_id, fc_user_fname, fc_user_lname, fc_user_email, fc_user_password) values (1, 'Ratik', 'vig', 'ratikvig@gmail.com', 'secret11')", (err) => {
                if(err) {
                    res.send(500)
                    throw err
                }
                console.log('1 record added')
                res.status(201).send('1 record added')
            })
    }catch(err){
        console.log(err)
    }
})
module.exports = router