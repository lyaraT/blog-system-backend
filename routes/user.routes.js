const express = require("express");
const myFunction = require("../controllers/user.controller");


const userRouter = (express.Router());

userRouter.post("/create", myFunction.registerController);
userRouter.get("/login", myFunction.login);
userRouter.get("/get-all", myFunction.getAllController);
userRouter.put("/update", myFunction.getAllController);
userRouter.get("/get-one/:id", myFunction.getOneController);
userRouter.delete("/delete/:id", myFunction.deleteController);



module.exports = userRouter;
