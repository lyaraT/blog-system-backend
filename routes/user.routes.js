const express = require("express");
const myFunction = require("../controllers/user.controller");


const userRouter = (express.Router());

userRouter.post("/create", myFunction.registerController);
userRouter.post("/login", myFunction.login);
userRouter.post("/paged", myFunction.getAllController);
userRouter.post("/update", myFunction.updateController);
userRouter.get("/get-one/:id", myFunction.getOneController);
userRouter.delete("/delete/:id", myFunction.deleteController);



module.exports = userRouter;
