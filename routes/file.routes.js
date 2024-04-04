const express = require("express");
const myFunction = require("../controllers/file.controller");
const multer = require("multer");
const upload = multer();


const fileRouter = (express.Router());

fileRouter.post("/upload", myFunction.uploadFile);




module.exports = fileRouter;
