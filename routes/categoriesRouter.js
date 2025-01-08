const { Router } = require('express')
const categoriesController = require('../controllers/categoriesController')
const categoriesRouter = Router()

categoriesRouter.get('/', categoriesController.categoriesListGet)
categoriesRouter.post('/', categoriesController.categoryCreatePost)
categoriesRouter.put('/:id', categoriesController.categoryUpdatePut)
categoriesRouter.delete('/:id', categoriesController.categoryDelete)

module.exports = categoriesRouter
