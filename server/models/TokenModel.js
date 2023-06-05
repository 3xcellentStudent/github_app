const {Schema, model} = require('mongoose')

const TokenSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   refreshToken: {
      type: String,
      required: true
   },
   gitToken: {
      type: String,
      default: ''
   }
})

module.exports = model('Token', TokenSchema)