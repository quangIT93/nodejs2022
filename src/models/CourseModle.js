const mongoose = require("mongoose");
const schema = mongoose.Schema;

const courseSchema = new schema(
  {
    courseName: {
      type: String,
      require: true,
      // không được trùng
      //   unique: true,
    },
    lecturer: {
      type: String,
      require: true,
      //   unique: true,
    },
    price: {
      type: Number,
      //   require: true,
    },
    image: {
      type: String,
      //   require: true,
    },
    numberVideo: {
      type: Number,
      //   require: true,
    },
    detail: {
      type: String,
      //   require: true,
    },
    user: {
      // su dung ham populate du noi 2 table
      //   const posts = await Post.find({ user: "62ec2d75beb3f90144d2e03c" }).populate('user', ['userName'])
      type: schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Course", courseSchema);
