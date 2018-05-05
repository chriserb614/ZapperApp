var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

var UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  email: String,
  zip: {
    type: String,
    default: ''
  },
  profilePic: {
    type: String
    // default: 'noimage.png'
  },
  bio: {
    type: String,
    default: ''
  },
  influences: {
    type: String,
    default: ''
  },
  favBooks: {
    type: String,
    default: ''
  },
  notWriting: {
    type: String,
    default: ''
  },
  favHero: {
    type: String,
    default: ''
  },
  favVillain: {
    type: String,
    default: ''
  },
  works: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Work'
    }
  ],
  critiques: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Critique'
    }
  ],
  friends: [
    {
      friendId: String,
      friendName: String,
      friendPic: String
    }
  ],
  friendRequests: [
    {
      sendingFriendId: String,
      sendingFriendName: String,
      sendingFriendPic: String
    }
  ],
  createdDate: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
})

UserSchema.plugin(passportLocalMongoose, {usernameField: 'username'})
module.exports = mongoose.model('User', UserSchema)
