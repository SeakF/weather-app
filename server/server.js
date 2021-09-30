const express = require('express')
const dotenv = require('dotenv')
const path = require('path')

const app = express()

dotenv.config()

const port = process.env.PORT || 5502


app.use(express.static('../client/build'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
})

app.listen(port, () => console.log(`app listen at port ${port}`))