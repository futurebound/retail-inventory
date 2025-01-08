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

async function createCategoryPost(req, res) {
  console.log(
    `saving category name: ${req.body.name} desc: ${req.body.description}`
  )
  const { name, description } = req.body
  await db.insertCategory(name, description)

  // TODO: consider where to redirect
  res.redirect('/categories')
}

module.exports = {
  categoriesListGet,
  createCategoryPost,
}
