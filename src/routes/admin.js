// const { Router } = require("express");
const express = require("express");
const route = express.Router();

const adminController = require("../Controllers/AdminController");
const verifyToken = require("../middleware/authMiddleware");
const authAdmin = require("../middleware/adminMiddleware");

route.get(
  "/managerUser?:id",
  verifyToken,
  authAdmin,
  adminController.managerUser
);
route.get(
  "/managerCourse?:id",
  verifyToken,
  authAdmin,
  adminController.managerCourse
);
route.post(
  "/deleteUser/:id",
  verifyToken,
  authAdmin,
  adminController.deleteUser
);
route.post(
  "/deteleCourse/:id",
  verifyToken,
  authAdmin,
  adminController.deleteCourse
);
route.post(
  "/updateUser/:id",
  verifyToken,
  authAdmin,
  adminController.updateUser
);
route.post(
  "/updateCourse/:id",
  verifyToken,
  authAdmin,
  adminController.updateCourse
);

route.post("/addUser/:id", verifyToken, authAdmin, adminController.addUser);
route.get("/addCourse/:id", verifyToken, authAdmin, adminController.addCourse);

module.exports = route;
