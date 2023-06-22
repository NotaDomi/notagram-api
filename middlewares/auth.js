const User = require('../models/users.js')

module.exports = {

  requireAuth: (req, res, next) => {

    if (!req.session.userLogged) {
      res.status(401).json({ notAutorized: true, message: 'Sessione scaduta. Per favore effettua nuovamente il login' })
    } else {
      User.findById(req.session.userLogged.id)
        .then(user => {
          req.user = user
          next()
        })
        .catch(error => {
          console.error('Errore di autenticazione:', error)
          res.status(500).json({ message: 'Errore interno al server' })
        })
    }
  }
}