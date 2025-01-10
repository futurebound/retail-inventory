const db = require('../db/queries')

async function categoriesListGet(req, res) {
  const { search } = req.query
  let categories

  if (search) {
    categories = await db.searchCategories(search)
  } else {
    categories = await db.getAllCategories()
  }

  res.json({ categories: categories })
}

async function categoryGet(req, res) {
  const { id } = req.params
  const category = await db.getCategory(id)
  if (category.length > 0) {
    res.json({ category: category })
  } else {
    res.status(404).json({ message: 'Category not found. ' })
  }
}

async function categoryProductsGet(req, res) {
  const { id } = req.params
  const category = await db.getCategory(id)
  if (category.length == 0) {
    return res.status(404).json({ message: 'Category not found. ' })
  }

  const products = await db.getProductsByCategory(id)
  res.json({ products: products })
}

async function categoryCreatePost(req, res) {
  console.log(
    `saving category name: ${req.body.name} desc: ${req.body.description}`,
  )
  const { name, description } = req.body
  await db.insertCategory(name, description)

  // TODO: consider where to redirect
  res.redirect('/categories')
}

async function categoryUpdatePut(req, res) {
  console.log(`udpating category id = ${req.params.id}`)
  const { id } = req.params
  const { name, description } = req.body
  const updated = await db.updateCategory(id, name, description)
  console.log(updated) // TODO: remove log

  if (updated.length > 0) {
    res.status(200).json({ message: 'Category updated successfully.' })
  } else {
    res.status(404).json({ message: 'Category not found. ' })
  }

  // TODO: consider where to redirect
  // res.redirect('/categories')
}

async function categoryDelete(req, res) {
  console.log(`deleting category id = ${req.params.id}`)
  const { id } = req.params
  const deleted = await db.deleteCategory(id)
  console.log(deleted) // TODO: remove log

  if (deleted.length > 0) {
    res.status(200).json({ message: 'Category deleted successfully.' })
  } else {
    res.status(404).json({ message: 'Category not found. ' })
  }

  // TODO: consider where to redirect
  // res.redirect('/categories')
}

module.exports = {
  categoriesListGet,
  categoryGet,
  categoryProductsGet,
  categoryCreatePost,
  categoryUpdatePut,
  categoryDelete,
}
