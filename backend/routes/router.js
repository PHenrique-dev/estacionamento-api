const { NewUserController } = require('../controllers/registerControllers');
const { User, getUser, checkToken } = require('../controllers/userControllers');
const carrosController = require("../controllers/carrosControllers");
const motosController = require('../controllers/motosControllers');
const router = require('express').Router()
router.get('/user/:id', getUser, checkToken)
router.post('/auth/register', NewUserController)
router.post('/auth/user', User)
module.exports = router
router
.route("/carros")
.post((req, res) => carrosController.create(req, res))
router
.route("/carros")
.get((req, res) => carrosController.getAll(req, res))
router
.route("/carros/:id")
.get((req, res) => carrosController.get(req, res))
router
.route("/carros/:id")
.delete((req, res) => carrosController.delete(req, res))
router
.route("/carros/:id")
.put((req, res) => carrosController.update(req, res))
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