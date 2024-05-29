const express = require("express");
const myFunction = require("../controllers/slot.controller");


const slotRouter = (express.Router());

slotRouter.post("/create", myFunction.createController);
slotRouter.post("/get-paged", myFunction.getAllController);
slotRouter.post("/update", myFunction.updateController);
slotRouter.get("/get/:id", myFunction.getOneController);
slotRouter.delete("/delete/:id", myFunction.deleteOneController);



module.exports = slotRouter;
