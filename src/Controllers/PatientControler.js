const User = require("../models/UserModel");
const Course = require("../models/CourseModle");
const jwt = require("jsonwebtoken");
const {
  mongoseToObject,
  mutipleMongoseToObject,
} = require("../utils/mongooses");

class PatientController {
  async patientHome(req, res, next) {
    // const course = new Course({
    //   courseName: "Javascript",
    //   lecturer: "Sơn Đặng",
    //   price: 2000000,
    //   image:
    //     "https://thumbs.dreamstime.com/z/javascript-logo-editorial-illustrative-white-background-javascript-logo-editorial-illustrative-white-background-eps-download-208329455.jpg",
    //   numberVideo: 30,
    //   detail:
    //     "Khoá Javascript cơ bản giúp bạn cũng cố kiến thức với những khái niệm và các bài thực hành. Khoá học còn giúp các bạn thực hiện một project cho bản thân với các ứng dụng cơ bản nhưng thực tế cao...",
    //   user: user._id,
    // });

    // course.save();
    try {
      console.log(req.user._id == req.params.id);
      if (req.user._id == req.params.id) {
        Course.find({ user: req.user._id })
          .then((courses) => {
            courses = courses.map((course) => course);
            return res.render("patient/patientHome", {
              layout: "mainLayout",
              id: req.user._id,
              user: mongoseToObject(req.user),
              courses: mutipleMongoseToObject(courses),
            });
          })
          .catch(next);
      } else {
        // khong dung id
        res.status(404).json({ message: "Page not found" });
        // res.json({ message: "Page not found" });
      }
    } catch (error) {
      res.json({ message: "loi server", error });
    }
  }

  async patientEdit(req, res, next) {
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
          return res.redirect(`/user/${req.user._id}`);
        })
        .catch(next);
    } catch (error) {
      console.log(error);
      res.json({ message: error });
    }
  }
  // console.log("res.locals._url", req.locals._url);

  //[GET]/patients/:patientID
  // async detailInfo(req, res) {
  //   res.render("./patient/patientDetailInfo", {
  //     layout: "mainLayout",
  //     title: "Thông tin cá nhân",
  //   });
  // }
}

module.exports = new PatientController();
