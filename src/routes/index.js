const authRoute = require("./auth");
const patientRoute = require("./patient");
const managerRoute = require("./manager");
const adminRoute = require("./admin");

function route(app) {
  app.use("/admin", adminRoute); //Dành cho phân hệ quản trị/  Minh Lợi
  // app.use("/admin/deleteUser", adminRoute); //Dành cho phân hệ quản trị/  Minh Lợi
  app.use("/manager", managerRoute); //Dành cho phân hệ quản lý   /  Ngọc Nguyên + Công Tuấn
  app.use("/user", patientRoute); //Dành cho phân hệ người dùng/ Thái Bảo   ;
  app.use("/", authRoute); //Trang chủ, đăng nhập, đăng ký, xem một số thông tin chung, ... Huy Tùng
}

module.exports = route;
