const UserModel = require('../models/UserModel')
const HashService = require('./HashService')
const mailService = require('./MailService')
const tokenService = require('./TokenService')
const UserDto = require('../userDto/UserDto')
const uuid = require('uuid')

class UserService{

   async generateAndSaveToken(userDto){
      const tokens = tokenService.generateTokens({...userDto})
      await tokenService.saveToken(userDto.id, tokens.refreshToken)

      return {...tokens, user: userDto}
   }

   async registration(email, password){
      const checkUser = await UserModel.findOne({email})
      if(checkUser) return `User with this email has already been created`
      
      const hashPassword = await HashService.scryptHash(password)
      const activationLink = uuid.v4()
      const user = await UserModel.create({email, password: hashPassword, activationLink})
      await mailService.activationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
      
      const userDto = new UserDto(user)
      return this.generateAndSaveToken(userDto)
   }

   async activate(activationLink){
      const user = await UserModel.findOne({activationLink})

      if(!user) return 'Incorrect activation link !'

      user.isActivated = true
      await user.save()
   }

   async login(email, password){
      const user = await UserModel.findOne({email})
      if(!user) return 'Invalid email'

      if(!user.isActivated) return `Confirm your mail ${email} !`

      const isPassEquals = await HashService.scryptVerify(password, user.password)
      if(!isPassEquals) return 'Invalid password'

      const userDto = new UserDto(user)
      return this.generateAndSaveToken(userDto)
   }

   async logout(refreshToken){
      const token = await tokenService.removeToken(refreshToken)
      return token
   }

   async reset(email){
      try {
         const user = await UserModel.findOne({email})
         if(!user) return 'Email not found !'

         const random = () => {
            const result = (Math.random() * 10000).toFixed(0)
            if(`${result}`.length !== 4) return random()
            else return result
         }

         const code = random()

         await mailService.sendLetterResetPass(email, code)

         return {code: code}
      } catch (err){console.log(err)}
   }

   async recovery(email, password){
      try {
         let hashedPassword = null
         await HashService.scryptHash(password)
         .then(hashed => hashedPassword = hashed)
         
         const user = await UserModel.findOneAndUpdate(email, {password: hashedPassword})
         return user
      } catch (err){console.log(err)}
   }
}

module.exports = new UserService()