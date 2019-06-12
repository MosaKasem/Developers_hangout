const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true, trim: true, lowercase: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  admin: {type: String, required: true, default: false},
  avatar: {type: String},
  date: { type: Date, default: Date.now }
})
const User = mongoose.model('user', UserSchema)
// module.exports = User = mongoose.model('user', UserSchema)
module.exports = User
