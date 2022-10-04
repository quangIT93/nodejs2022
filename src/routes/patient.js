const express = require("express");

const route = express.Router();
const patientController = require("../Controllers/PatientControler");
const verifyToken = require("../middleware/authMiddleware");

route.get("/:id", verifyToken, patientController.patientHome);
// route.get("/:id/infoUser", patientController.detailInfo);

route.post("/:id/edit", verifyToken, patientController.patientEdit);

module.exports = route;
