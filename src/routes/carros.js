const router = require('express').Router()

const carrosController = require("../controllers/carrosControllers")
router
.route("/carros")
.post((req, res) => carrosController.create(req, res))
router
.route("/carros")
.get((req, res) => carrosController.getAll(req, res))
router
.route("/carros/:id")
.get((req, res) => carrosController.get(req, res))


module.exports = router