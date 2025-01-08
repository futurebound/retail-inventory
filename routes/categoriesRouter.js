const { Router } = require('express')
const categoriesController = require('../controllers/categoriesController')
const categoriesRouter = Router()

categoriesRouter.get('/', categoriesController.categoriesListGet)
categoriesRouter.post('/', categoriesController.categoryCreatePost)
categoriesRouter.delete('/:id', categoriesController.categoryDelete)

module.exports = categoriesRouter
