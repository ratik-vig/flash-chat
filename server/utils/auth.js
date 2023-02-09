const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const { token } = req.headers
    if(!token){
        res.status(401).send({error: 'Not authorized'})
        return
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            res.status(498).send(err)
        }
        next()
    })
}

module.exports = auth