const express = require('express')
const messagesController = require('../controllers/messages')

const router = express.Router()

router.post('/send',messagesController.sendMessage)

router.get('/getMessages/:sender/:receiver',messagesController.getMessagesBySenderAndReceiver)

module.exports = router