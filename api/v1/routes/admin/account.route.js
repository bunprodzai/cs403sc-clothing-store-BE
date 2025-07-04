const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/accounts.controller");
const validate = require("../../validates/admin/accounts.validate")

router.get("/", controller.index);

router.post("/create", validate.createPost, controller.createPost);

router.patch("/edit/:id", validate.editPatch, controller.editPatch);

router.get("/change-status/:status/:id", controller.changeStatus);

router.delete("/delete/:id", controller.delete);

module.exports = router;