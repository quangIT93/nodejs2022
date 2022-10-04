const express = require("express");

const route = express.Router();

const authController = require("../Controllers/AuthController");

const { verifyToken } = require("../middleware/authMiddleware");

route.get("/", authController.home);
route.get("/signUpPage", authController.signUpPage);
route.get("/signInPage", authController.signInPage);
route.post("/signup", authController.signUp);
route.post("/signin", authController.signIn);
route.get("/admin-SignIn-Page", authController.adminLogin);
route.post("/admin-SignIn/", authController.AdminSignIn);
route.get("/logout", authController.logOut);

module.exports = route;
// route.get('/signup',siteController.signup);
// route.get('/signin',siteController.signin);
// route.get('/log-out',siteController.logOut);
// route.get('/createNewPwd',siteController.createNewPwd);
// route.get('/getDistrict', siteController.getDistrict);
// route.get('/getWard', siteController.getWard);
// route.post('/adminSignUp',siteController.adminSignUp);
// route.post('/userSignUp',siteController.userSignUp);
// route.post('/signin',siteController.doSignIn);
// route.post('/createNewPwd',siteController.doCreateNewPwd);
