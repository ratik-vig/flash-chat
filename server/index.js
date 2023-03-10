const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const userController = require('./controllers/UserController')
const conversationController = require('./controllers/ConversationController')

const app = express()

app.use(express.json())
app.use(cors())
dotenv.config()

app.get('/', (req, res) => {
    console.log('home route')
    res.send('home route')
})

app.use('/api/v1/users', userController)
app.use('/api/v1/conversations', conversationController)

const PORT = process.env.PORT || 3000

app.listen(PORT)