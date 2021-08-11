const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true,
    enum: ['Google']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', UserSchema)