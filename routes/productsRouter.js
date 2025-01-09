const { Router } = require('express')
const productsController = require('../controllers/productsController')
const productsRouter = Router()

productsRouter.get('/', productsController.productsListGet)

module.exports = productsRouter
