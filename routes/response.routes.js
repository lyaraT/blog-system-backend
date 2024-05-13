const express = require("express");
const myFunction = require("../controllers/response.controller");


const responseRouter = (express.Router());

responseRouter.post("/create", myFunction.createController);
responseRouter.post("/get-paged", myFunction.getAllController);
responseRouter.post("/get-by-date", myFunction.getOnebyDateController);

module.exports = responseRouter;