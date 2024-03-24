const express = require("express");
const myFunction = require("../controllers/file.controller");
const multer = require("multer");
const upload = multer();


const fileRouter = (express.Router());

fileRouter.post("/upload", upload.single('file'), myFunction.uploadFile);




module.exports = fileRouter;
