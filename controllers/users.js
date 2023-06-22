const User = require('../models/users')


module.exports = {

    getAllUsers: (req,res) => {
        User.find({_id: { $ne: req.session.userLogged.id }}, `_id username`)
        .then(r => usersList=r)
        .then(()=>User.findOne({_id: req.session.userLogged.id}, `friends`)
        .populate({
          path: 'friends',
          select: 'username',
        })
        .then(r=>friendsList=r.friends))
        .then(()=>{
          res.json(usersList.filter(user =>!friendsList.some(friend => friend.username===user.username)))
        })
    },

    getAllFriends: (req,res) => {
        User.findOne({_id: req.session.userLogged.id}, `username friends`)
        .populate({
            path: 'friends',
            select: 'username',
          })
        .then(r => res.json(r))
    },

    addFriend: (req,res) => {
        User.findOne({_id:req.body.id})
        .populate([`friends`])
        .then(user => {
          user.friends.push({_id:req.session.userLogged.id, username:req.session.userLogged.username})
          user.save()
        })

        User.findOne({_id:req.session.userLogged.id})
        .populate([`friends`])
        .then(user => {
          user.friends.push({_id:req.body.id, username:req.body.username})
          user.save()
        })
        .then(()=>res.send({ message: 'Amico aggiunto' }))
        
    },

    removeFriend: (req,res) => {

      User.findOne({_id:req.body.id})
      .populate({
        path: 'friends',
        select: 'username',
      })
      .then(user=>{
        user.friends=user.friends.filter(e=>e.username!==req.session.userLogged.username)
        user.save()
      })

      User.findOne({_id:req.session.userLogged.id})
      .populate({
        path: 'friends',
        select: 'username',
      })
      .then(user=>{
        user.friends=user.friends.filter(e=>e.username!==req.body.username)
        user.save()
      })
      .then(()=>res.send({ message: 'Amico rimosso' }))
    }
}