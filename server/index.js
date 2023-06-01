require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./routes/router.js')

const app = express()
app.use(cors({
   credentials: true, origin: process.env.CLIENT_URL
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api', router)
app.use(cookieParser)

const PORT = process.env.PORT || 5000

async function start(){
   try {
      await mongoose.connect(process.env.DB_URL).then(() => console.log('Connected to DB...'))
      app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}...`))
   } catch(err){console.log(err)}
}
start()