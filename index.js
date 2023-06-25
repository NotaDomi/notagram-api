require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
//const https = require('https')
const http = require('http')
const fs = require('fs')

const PORT=process.env.PORT || '3001'

const app = express()

/*const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}

const server = https.createServer(options, app)*/

const server = http.createServer(app)

mongoose.connect(process.env.DATABASE_URI)

const db = mongoose.connection
db.once('open', () => {
  console.log('Connesso al DB')
  server.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`)
  })
})

const authRouter = require('./routes/auth')
const router = require('./routes/api')
const authMiddleware = require('./middlewares/auth')

app.use(express.json())
app.use(cors({
  origin:["http://localhost:3000","https://notagram-app.onrender.com"],
  methods: ["GET","POST"],
  credentials: true
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
  key: 'userLogged',
  secret: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    domain: "notagram-api.onrender.com",
    maxAge: 24*60*60*1000,
    sameSite: true,
    //secure: true,
    httpOnly: true
  }
}))


app.use('/auth', authRouter)

app.use('/api',authMiddleware.requireAuth)

app.use('/api', router)