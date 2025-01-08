const db = require('../db/queries')

async function categoriesListGet(req, res) {
  const { search } = req.query
  let categories

  if (search) {
    categories = await db.searchCategories(search)
  } else {
    categories = await db.getAllCategories()
  }

  console.log('Categories: ', categories)
  res.send(
    'Categories: ' + categories.map((category) => category.name).join(', ')
  )
}

async function categoryCreatePost(req, res) {
  console.log(
    `saving category name: ${req.body.name} desc: ${req.body.description}`
  )
  const { name, description } = req.body
  await db.insertCategory(name, description)

  // TODO: consider where to redirect
  res.redirect('/categories')
}

async function categoryDelete(req, res) {
  console.log(`deleting category id = ${req.params.id}`)
  const { id } = req.params
  const deleted = await db.deleteCategory(id)
  console.log(deleted)
  res.redirect('/categories')
}

module.exports = {
  categoriesListGet,
  categoryCreatePost,
  categoryDelete,
}
