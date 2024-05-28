const express = require("express");
const myFunction = require("../controllers/slot.controller");


const slotRouter = (express.Router());

slotRouter.post("/create", myFunction.createController);
slotRouter.post("/get-paged", myFunction.getAllController);
slotRouter.post("/update", myFunction.updateController);
slotRouter.get("/get/:id", myFunction.getOneController);
// blogRouter.delete("/delete/:id", myFunction.deleteController);



module.exports = slotRouter;
