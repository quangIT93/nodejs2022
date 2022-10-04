const User = require("../models/UserModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

class AuthController {
  // @route get /
  // @desc get home
  // @access Puclic
  // console.log(cookie)0ư
  async home(req, res) {
    try {
      const token = req.cookies.token;
      if (token) {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findOne({ _id: data.userId });
        res.render("home", {
          layout: "mainLayout",
          id: user._id,
          userName: user.userName,
          job: user.job,
          money: user.money,
          image: user.image,
        });
      }
      res.render("home", {
        layout: "mainLayout",
      });
    } catch (error) {
      res.status(500).json({ message: "loi server", error });
    }
  }

  // @route get /
  // @desc get userSignUp
  // @access Puclic
  async signUpPage(req, res) {
    try {
      const token = req.cookies.token;
      if (token) {
        return res.redirect("/");
      }
      res.render("./Account/userSignUp", {
        layout: "accountLayout",
        title: "Trang Đăng Ký",
      });
    } catch (error) {
      res.status(500).json({ message: "loi server" });
    }
  }

  // @route get /
  // @desc get signInPage
  // @access Puclic
  async signInPage(req, res) {
    try {
      const token = req.cookies.token;
      if (token) {
        return res.redirect("/");
      }

      res.render("./Account/userSignIn", {
        layout: "accountLayout",
        title: "Trang Đăng Ký",
      });
    } catch (error) {
      res.status(500).json({ message: "loi server" });
    }
  }

  // method: post => register
  async signUp(req, res) {
    try {
      const { userName, passWord, email, confirmPw } = req.body;
      let checkUser = true,
        checkPass = true,
        checkEmail = true,
        checkConfirmPw = true;
      if (userName) checkUser = false;
      if (passWord) checkPass = false;
      if (email) checkEmail = false;
      if (confirmPw) checkConfirmPw = false;

      console.log("checkUser", checkUser);
      if (!userName || !passWord || !email || !confirmPw)
        return res.render("./Account/userSignUp", {
          layout: "accountLayout",
          warnningUserName: "vui long nhap ten dang nhap",
          warnningPassWord: "vui long nhap ten mat khau",
          warnningEmail: "vui long nhap email",
          warnningConfirmPw: "vui long nhap xác nhận mật khẩu",
          checkUser,
          checkPass,
          checkEmail,
          checkConfirmPw,
        });

      console.log("check user");
      const user = await User.findOne({ userName });
      console.log(user);
      if (user) {
        checkUser = true;
        return res.render("./Account/userSignUp", {
          layout: "accountLayout",
          warnningUserName: "tên đăng nhập đã được sử dụng",
          checkUser,
        });
      }
      if (passWord !== confirmPw) {
        checkPass = true;
        checkConfirmPw = true;
        return res.render("./Account/userSignUp", {
          layout: "accountLayout",
          warnningPassWord: "Xác thực mật khẩu không trùng khớp",
          warnningConfirmPw: "Xác thực mật khẩu không trùng khớp",
          checkPass,
          checkConfirmPw,
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(passWord, salt);
      const hashedConfirmPw = bcrypt.hashSync(confirmPw, salt);
      console.log("kiem tra mk", hashedConfirmPw);
      const newUser = await new User({
        userName,
        passWord: hashed,
        confirmPw: hashedConfirmPw,
        email,
        image: "Chưa tải lênnnnn",
        name: "chưa được cập nhật",
        job: "chưa được cập nhật",
        address: "chưa được cập nhật",
        sex: "chưa được cập nhật",
        money: 0,
        admin: false,
      });
      console.log("luu user");
      await newUser.save();
      res.render("./Account/userSignIn", {
        layout: "accountLayout",
        title: "Trang Đăng Ký",
      });
    } catch (error) {
      res.status(500).json({ message: "loi server", error });
    }
  }

  // method: post => login
  async signIn(req, res) {
    const { userName, passWord } = req.body;

    let checkUser = false,
      checkPass = false;
    console.log(userName);
    try {
      const user = await User.findOne({ userName });
      console.log("user", user);
      if (!user) {
        checkUser = true;
        checkPass = true;
        return res.render("./Account/userSignIn", {
          layout: "accountLayout",
          warnningUserName: "Tên đăng nhập hoặc mật khẩu không chính xác",
          warnningPassWord: "Tên đăng nhập hoặc mật khẩu không chính xác",
          checkUser,
          checkPass,
        });
      }
      const passwordValid = await bcrypt.compare(passWord, user.passWord);
      console.log("passwordValid", passwordValid);
      if (!passwordValid) {
        checkUser = true;
        checkPass = true;
        return res.render("./Account/userSignIn", {
          layout: "accountLayout",
          warnningUserName: "Tên đăng nhập hoặc mật khẩu không chính xác",
          warnningPassWord: "Tên đăng nhập hoặc mật khẩu không chính xác",
          checkUser,
          checkPass,
        });
      }

      const accessToken = await jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      function setCookie(cookieName, ValueToken) {
        res.cookie(cookieName, ValueToken, { expire: 400000 + Date.now() });
      }
      setCookie("token", accessToken);
      res.redirect(`/user/${user._id}`);
      // res.redirect('user/')
    } catch (error) {
      res.status(500).json({ message: "loi server", error });
    }
  }

  async adminLogin(req, res) {
    res.render("./Account/adminSignIn", {
      layout: "accountLayout",
      title: "Trang Đăng Ký",
    });
  }

  async AdminSignIn(req, res) {
    const { userName, passWord } = req.body;

    let checkUser = false,
      checkPass = false;
    console.log(userName);
    try {
      const user = await User.findOne({ userName, admin: true });
      console.log("user", user);
      if (!user) {
        checkUser = true;
        checkPass = true;
        return res.render("./Account/adminSignIn", {
          layout: "accountLayout",
          warnningUserName: "Tên đăng nhập hoặc mật khẩu không chính xác",
          warnningPassWord: "Tên đăng nhập hoặc mật khẩu không chính xác",
          checkUser,
          checkPass,
        });
      }
      const passwordValid = await bcrypt.compare(passWord, user.passWord);
      console.log("passwordValid", passwordValid);
      if (!passwordValid) {
        checkUser = true;
        checkPass = true;
        return res.render("./Account/adminSignIn", {
          layout: "accountLayout",
          warnningUserName: "Tên đăng nhập hoặc mật khẩu không chính xác",
          warnningPassWord: "Tên đăng nhập hoặc mật khẩu không chính xác",
          checkUser,
          checkPass,
        });
      }

      const accessToken = await jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      function setCookie(cookieName, ValueToken) {
        res.cookie(cookieName, ValueToken, { expire: 400000 + Date.now() });
      }
      setCookie("token", accessToken);
      res.redirect(`/admin/managerUser?id=${user._id}`);
      // res.redirect('user/')
    } catch (error) {
      res.status(500).json({ message: "loi server", error });
    }
  }

  async logOut(req, res, next) {
    res.clearCookie("token");
    try {
      res.redirect("/");
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new AuthController();
