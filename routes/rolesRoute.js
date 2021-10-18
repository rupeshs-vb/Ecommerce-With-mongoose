const express = require("express");
const authToken=require("../middleware/authToken")

const roleRouter = express.Router();

const {
  storerole,
  getroles,
  getroleDetail,
  updaterole,
  deleterole,
} = require("../controller/rolescontroller");

roleRouter.get("/roles", getroles);
roleRouter.post("/roles", storerole);
roleRouter.get("/roles/:id",getroleDetail);
roleRouter.put("/roles/:id",authToken,updaterole);
roleRouter.delete("/roles/:id",authToken,deleterole);

module.exports = roleRouter;
