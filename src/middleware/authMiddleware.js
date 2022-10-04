// kiem tra xem co asset token trong header ma request gui len khong
// Authorization: Bearer kskbgsgihgihsgnklnklsnvoibafjajk
// => neu co va dung vs token nguoi dung thi gui post
// => neu khong thi khong cho phep di tiep nua

const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.redirect("/signInPage");
  }
  try {
    // mã hoá token => id
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // tìm kiếm token từ idmaf token mã hoá
    const user = await User.findOne({ _id: data.userId });
    // const user = await User.findOne({ _id: data._id, "tokens.token": token });
    req.user = user;
    req.id = user._id;
    req.token = token;

    return next();
  } catch {
    return res.sendStatus(403);
  }
};

module.exports = verifyToken;
