require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const scrapeData = require('./models/app')
const { firstFetch } = require('./services/appService')

app.use(express.static(path.join(__dirname, "client", "build")))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api', require('./routes/index'))

const port = process.env.PORT || 8080

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then((conn) => {
  console.log(`MongoDB Connected: ${conn.connection.host}`)
  app.listen(port, () => {
    console.log(`Server started on port ${port}`)
  })
  scrapeData.countDocuments({}, async (err, count) => {
    if (err) {
      console.log('error in checking if collection is populated')
    } else if (count > 0) {
      console.log('count of documents is : ', count)
    } else if (count == 0) {
      await firstFetch()
      console.log('database populated')
    }
  })
  }).catch((err) => {
    console.log(err)
    console.log("Exiting process as unable to connect to database")
    process.exit(1)
  })