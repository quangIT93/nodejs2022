// kiem tra xem co asset token trong header ma request gui len khong
// Authorization: Bearer kskbgsgihgihsgnklnklsnvoibafjajk
// => neu co va dung vs token nguoi dung thi gui post
// => neu khong thi khong cho phep di tiep nua

const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const authAdmin = async (req, res, next) => {
  try {
    if (req.user.admin === true) {
      next();
    } else {
      res.json({ message: "ban khong phai admin" });
    }
  } catch (error) {
    res.json({ message: "loi server", error });
  }
};

module.exports = authAdmin;
