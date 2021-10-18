const express = require("express");
const authToken=require("../middleware/authToken")

const tagRouter = express.Router();

const {
  storetag,
  gettags,
  gettagDetail,
  updatetag,
  deletetag,
} = require("../controller/tagcontroller");

tagRouter.get("/tags", gettags);
tagRouter.post("/tags", storetag);
tagRouter.get("/tags/:id", gettagDetail);
tagRouter.put("/tags/:id",authToken,updatetag);
tagRouter.delete("/tags/:id",authToken,deletetag);

module.exports = tagRouter;
