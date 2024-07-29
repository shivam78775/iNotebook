const connectToMongo = require('./db');
connectToMongo();
//const authRotes = require("./routes/auth.js")
var cors = require('cors')

const express = require('express')
const app = express()
const port = 5000


app.use(cors())

app.use(express.json())
//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello Shivam!')
})

app.listen(port, () => {
  console.log(`iNotebook Backend listening on port https://localhost:${port}`)
})