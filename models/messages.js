const mongoose = require('mongoose')


const messagesSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  content: String,
  timestamp: {
    type: String, 
    required: true,
  }
})

module.exports = mongoose.model("Message", messagesSchema)