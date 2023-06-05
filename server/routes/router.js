const Router = require('express').Router
const GitController = require('../controllers/GitController')
const userController = require('../controllers/UserController')

const router = Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/reset-password', userController.resetPass)
router.post('/recover-password', userController.recoveryPass)
router.post('/git-token', GitController.postTokenToDB)
router.post('/get-git_user', GitController.getGitUser)
router.get('/activate/:link', userController.activate)
router.get('/get-token', GitController.getGitToken)

module.exports = router