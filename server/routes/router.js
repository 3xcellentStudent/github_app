const Router = require('express').Router
const userController = require('../controllers/UserController')

const router = Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/reset-password', userController.resetPass)
router.post('/recover-password', userController.recoveryPass)
router.get('/activate/:link', userController.activate)

module.exports = router