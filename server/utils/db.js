const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'secret11',
    port: '3306'
})

connection.connect(err => {
    if (err) throw err
    console.log('connection to db successful')
})

module.exports = connection