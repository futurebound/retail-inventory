const { Router } = require('express')
const productsController = require('../controllers/productsController')
const productsRouter = Router()

productsRouter.get('/', productsController.productsListGet)
productsRouter.post('/', productsController.productCreatePost)
productsRouter.put('/:id', productsController.productUpdatePut)
productsRouter.delete('/:id', productsController.productDelete)

module.exports = productsRouter
