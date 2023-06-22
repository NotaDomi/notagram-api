const express = require('express')
const usersRouter = require('./users.js')
const messagesRouter = require('./messages.js')

const router = express.Router()

router.use('/users', usersRouter)

router.use('/messages', messagesRouter)

module.exports = router