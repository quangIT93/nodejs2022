const {
  mongoseToObject,
  mutipleMongoseToObject,
} = require("../utils/mongooses");

const Courses = require("../models/CourseModle");
const User = require("../models/UserModel");

const bcrypt = require("bcrypt");

class AdminController {
  //

  async managerUser(req, res) {
    console.log("quan ly user");

    User.find({}).then((users) => {
      return res.render("admin/managerUser", {
        layout: "mainLayout",
        user: mongoseToObject(req.user),
        users: mutipleMongoseToObject(users),
        id: req.user._id,
      });
    });
  }

  async managerCourse(req, res) {
    console.log("quan ly courses");

    console.log("req.paramssss", req.params);
    console.log("req.query", req.query);
    Courses.find({}).then((course) => {
      return res.render("admin/managerCourse", {
        layout: "mainLayout",
        user: mongoseToObject(req.user),
        course: mutipleMongoseToObject(course),
        id: req.user._id,
      });
    });
  }

  async deleteUser(req, res, next) {
    try {
      User.deleteOne({ _id: req.params.id })
        .then(() => {
          res.redirect("back");
        })
        .catch(next);
    } catch (error) {
      res.json({ error });
    }
  }

  async deleteCourse(req, res, next) {
    console.log("delete Course");
    try {
      Courses.deleteOne({ _id: req.params.id })
        .then(() => {
          res.redirect("back");
        })
        .catch(next);
    } catch (error) {
      res.json({ error });
    }
  }

  async updateUser(req, res, next) {
    try {
      // filter User
      await User.find({}).then((user) => {
        for (const key in req.body) {
          if (!req.body[key]) {
            req.body[key] = user.key;
          }
        }
      });

      // update
      User.updateOne({ _id: req.user._id }, req.body)
        .then(() => {
          return res.redirect(`back`);
        })
        .catch(next);
    } catch (error) {
      console.log(error);
      res.json({ message: error });
    }
  }

  async updateCourse(req, res, next) {
    try {
      await Courses.find({}).then((course) => {
        for (const key in req.body) {
          if (!req.body[key]) {
            console.log("key rong", key);
            console.log("req.body", req.body);
            req.body[key] = course.key;
          }
        }

        if (req.body.numberVideo == 1) {
          console.log("thoa numberVideo");
          // req.body.quatity = course.quatity;
          req.body.numberVideo = course.numberVideo;
        }

        if (req.body.price == 0) {
          console.log("thoa price");

          req.body.price = course.price;
        }
      });

      console.log("body sau khi filter", req.body);

      await Courses.updateOne({ _id: req.params.id }, req.body).then(() => {
        return res.redirect(`back`);
      });
    } catch (error) {
      res.json({ message: "lỗi server", error });
    }
  }

  async addUser(req, res, next) {
    try {
      console.log("add user");
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync("111", salt);
      const hashedConfirmPw = bcrypt.hashSync("111", salt);
      const number = Math.floor(Math.random() * 10000);
      console.log(hashedConfirmPw);
      console.log(number);

      const newUser = await User({
        userName: `newUser${number}`,
        passWord: hashed,
        confirmPw: hashedConfirmPw,
        email: `newuser${number}@gmail.com`,
        image: "Chưa tải lênnnnn",
        name: "chưa được cập nhật",
        job: "chưa được cập nhật",
        address: "chưa được cập nhật",
        sex: "chưa được cập nhật",
        money: 0,
        admin: false,
      });

      await newUser.save();
      console.log(newUser);
      res.redirect("back");
    } catch (error) {
      res.status(500).json({ message: "loi server", error });
    }
  }

  async addCourse(req, res, next) {
    try {
      const newCourse = await new Courses({
        courseName: "Chưa cập nhật",
        lecturer: "Chưa cập nhật",
        price: 0,
        image:
          "https://thumbs.dreamstime.com/z/no-image-available-icon-photo-camera-flat-vector-illustration-132483296.jpg",
        numberVideo: 1,
        detail: "Chưa cập nhật",
        user: req.user._id,
      });

      await newCourse.save();
      res.redirect("back");
    } catch (error) {
      res.status(500).json({ message: "loi server", error });
    }
  }
}

module.exports = new AdminController();
