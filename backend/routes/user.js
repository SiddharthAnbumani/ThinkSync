const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const middleware = require('../middleware')
router.route('/register')
.get(userController.renderRegister)
.post(userController.register)


router.route('/login')
.get(userController.renderLogin)
.post(middleware.passAuth,userController.login)
module.exports = router;

router.route('/logout')
.get(userController.logout)