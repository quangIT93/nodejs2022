const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    email: {
      type: String,
      require: true,
      // không được trùng
      unique: true,
    },
    userName: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      // require: true,
    },
    job: {
      type: String,
      //   require: true,
    },
    passWord: {
      type: String,
      //   require: true,
    },
    confirmPw: {
      type: String,
      //   require: true,
    },
    image: {
      type: String,
      //   require: true,
    },
    address: {
      type: String,
      //   require: true,
    },
    sex: {
      type: String,
      //   require: true,
    },
    money: {
      type: Number,
      //   require: true,
    },
    admin: {
      type: Boolean,
      //   require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Users", userSchema);
