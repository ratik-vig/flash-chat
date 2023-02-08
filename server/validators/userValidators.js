const { body, validationResult } = require('express-validator')
const db = require('../utils/db')

const createUser = [

    body('fname').not().isEmpty().withMessage('First name is required'),
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({min: 8}).withMessage('Password must have 8 characters'),
    body('confirmPassword').custom((value, { req }) => {
        if(value != req.body.password){
            throw new Error('Passwords do not match')
        }
        return true
    }), 
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).send({errors: errors.array()})
        }else{
            next()
        }
    }
]

const loginUser = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({min: 8}).withMessage('Password must have 8 characters'),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) res.status(400).send({errors: errors.array()})
        else next()
    }
]

module.exports = {createUser, loginUser}