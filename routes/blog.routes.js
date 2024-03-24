const express = require("express");
const myFunction = require("../controllers/blog.controller");


const blogRouter = (express.Router());

blogRouter.post("/create", myFunction.createController);
blogRouter.post("/get-paged", myFunction.getAllController);
blogRouter.post("/update", myFunction.updateController);
blogRouter.get("/get/:id", myFunction.getOneController);
// blogRouter.delete("/delete/:id", myFunction.deleteController);



module.exports = blogRouter;
