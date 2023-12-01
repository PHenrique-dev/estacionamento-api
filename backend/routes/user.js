const router = require('express').Router()

const userController = require("../controllers/userControllers")
router
.route("/auth/register")
.post((req, res) => userController.create(req, res))
router
.route("/auth/user")
.get((req, res) => userController.get(req, res))

module.exports = router