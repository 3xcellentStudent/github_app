const UserService = require('../services/UserService')

class UserController{
   async registration(req, res){
      try {
         const {email, password} = req.body
         const result = await UserService.registration(email, password)
         res.json(result)
      } catch(err){console.log(err)}
   }
   async activate(req, res){
      try {
         const activationLink = req.params.link
         await UserService.activate(activationLink)
         return res.redirect(`${process.env.CLIENT_URL}/login`)
      } catch(err){console.log(err)}
   }

   async login(req, res){
      try {
         const {email, password} = req.body
         const userData = await UserService.login(email, password)
         res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, HttpOnly: true})
         return res.json(userData)
      } catch (err){console.log(err)}
   }

   async logout(req, res){
      try {
         const refreshToken = req.rawHeaders.filter(item => item.includes('refreshToken'))[0].split('=')[1]
         const token = await UserService.logout(refreshToken)
         res.clearCookie('refreshToken')
         return res.json(token)
      } catch (err){console.log(err)}
   }

   async resetPass(req, res){
      try {
         const {email} = req.body
         const code = await UserService.reset(email)
         return res.json(code)
      } catch (err){console.log(err)}
   }

   async recoveryPass(req, res){
      try {
         const {email, password} = req.body
         const user = await UserService.recovery(email, password)
         return res.json(user)
      } catch (err){console.log(err)}
   }
}

module.exports = new UserController()