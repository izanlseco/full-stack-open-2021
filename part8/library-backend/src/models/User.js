const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favouriteGenre: {
    type: String,
  },
  friends: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    }
  ],
})

module.exports = mongoose.model('User', schema)