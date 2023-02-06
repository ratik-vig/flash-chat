const express = require('express')
const dotenv = require('dotenv')

const userController = require('./controllers/UserController')

const app = express()
dotenv.config()

app.get('/', (req, res) => {
    console.log('home route')
    res.send('home route')
})

app.use('/api/v1/users', userController)

const PORT = process.env.PORT || 3000

app.listen(PORT)