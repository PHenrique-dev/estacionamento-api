const router = require('express').Router()

const carrosRouter = require("./carros")
router.use("/", carrosRouter)
module.exports = router