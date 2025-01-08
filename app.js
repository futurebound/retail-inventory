const dotenv = require('dotenv')
dotenv.config()

const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const categoriesRouter = require('./routes/categoriesRouter')

app.use('/categories', categoriesRouter)

// error catch-all
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).send(err.message)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
})
