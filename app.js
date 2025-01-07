const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

const categoriesRouter = require('./routes/categoriesRouter')

app.use('/categories', categoriesRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
})
