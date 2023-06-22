const Message = require('../models/messages')

module.exports = {
  
    getMessagesBySenderAndReceiver: (req,res)=>{
        Message.find({$or:  [
                                { sender: req.params.sender, receiver: req.params.receiver },
                                { sender: req.params.receiver, receiver: req.params.sender }
                            ]
                    })
        .populate({
            path: 'sender receiver',
            select: 'username username',
          })
        .then(r => res.json(r))
    },
    
    sendMessage: (req,res)=>{
        Message.create({
            sender: req.body.sender,
            receiver: req.body.receiver,
            content: req.body.content,
            timestamp: new Date().toLocaleString()
        })
        .then(r=>res.json({ message: 'Messaggio inviato' }))
    }
}