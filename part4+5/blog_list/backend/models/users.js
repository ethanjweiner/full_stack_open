/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (_, returnedUser) => {
    returnedUser.id = returnedUser._id;
    delete returnedUser._id;
    delete returnedUser.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
