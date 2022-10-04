const express = require("express");

const route = express.Router();
const managerController = require("../Controllers/ManagerController");

route.get("/", managerController.packageFilter);
route.get("/suppliesFilter", managerController.suppliesFilter);
route.get("/sortList", managerController.sort);
route.get("/search", managerController.search);

module.exports = route;
