const router = require('express').Router()

const motosController = require("../controllers/motosControllers")
router
.route("/motos")
.post((req, res) => motosController.create(req, res))
router
.route("/motos")
.get((req, res) => motosController.getAll(req, res))
router
.route("/motos/:id")
.get((req, res) => motosController.get(req, res))
router
.route("/motos/:id")
.delete((req, res) => motosController.delete(req, res))
router
.route("/motos/:id")
.put((req, res) => motosController.update(req, res))


module.exports = router