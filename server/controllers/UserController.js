const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('../utils/db')
const queries = require('../utils/queries')
const userValidators  = require('../validators/userValidators')
const auth = require('../utils/auth')

const router = express()
router.use(express.json())

router.post('/create', userValidators.createUser, (req, res) => {
    const { fname, lname, email, password } = req.body
    db.query(queries.checkIfUserExists, [email], (err, results) => {

        if(err) throw err        
        if(results[0].count == 1){
            res.status(400).send('User already exists')
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        db.query(queries.createUser, [fname, lname, email, hashedPassword], (error, result) => {
            if(error) throw error
            if(result.affectedRows){
                res.status(200).send('User created')
            }
        })
    })
})

router.post('/login', userValidators.loginUser, (req, res) => {
    const { email, password } = req.body

    db.query(queries.loginUser, [email], (err, result) => {
        if(err) throw err

        if(!result[0]) {
            res.sendStatus(404)
            return
        }
        const passwordMatch = bcrypt.compareSync(password, result[0].fc_user_password)
        if(passwordMatch){
            jwt.sign({
                data: result[0]
              }, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
                if(err) throw err
                res.status(200).send(token)
              })
        }else{
            res.status(401).send({error: "Incorrect password"})
        }
    })
})

router.post('/test', auth,(req, res) => {
    res.status(200).send('protected route')
})

module.exports = router