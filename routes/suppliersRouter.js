const { Router } = require('express')
const suppliersController = require('../controllers/suppliersController')
const suppliersRouter = Router()

suppliersRouter.get('/', suppliersController.suppliersListGet)
suppliersRouter.get('/:id', suppliersController.supplierGet)
suppliersRouter.post('/', suppliersController.supplierCreatePost)
suppliersRouter.put('/:id', suppliersController.supplierUpdatePut)
suppliersRouter.delete('/:id', suppliersController.supplierDelete)

module.exports = suppliersRouter
