const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userInfoSchema = new Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
    },
    balance: {
      type: Number,
    },
    country: {
      type: String,
    },
    key: {
      type: String,
    },
  },
  { collection: 'user' }
);

userInfoSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
};
const UserInfo = mongoose.model('user', userInfoSchema);
module.exports = UserInfo;
