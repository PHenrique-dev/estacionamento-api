const router = require('express').Router()

const carrosRouter = require("./carros")
router.use("/", carrosRouter)
const motosRouter = require("./motos")
router.use("/", motosRouter)
module.exports = router