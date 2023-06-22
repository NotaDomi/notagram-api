const express = require('express')
const usersController = require('../controllers/users')
const methodOverride = require('method-override')

const router = express.Router()

router.use(methodOverride("_method", {
methods: "POST"
}));

router.get('/allUsers', usersController.getAllUsers)

router.get('/allFriends', usersController.getAllFriends)

router.put('/addFriend', usersController.addFriend)

router.put('/removeFriend', usersController.removeFriend)

module.exports = router