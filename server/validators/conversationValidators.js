const { body, validationResult } = require('express-validator')

const createConversation = [
    body('user1').not().isEmpty().isNumeric(),
    body('user2').not().isEmpty().isNumeric(),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).send({errors: errors.array()})
        }else{
            next()
        }
    }
]

module.exports = { createConversation }