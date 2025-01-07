const db = require('../db/queries')

async function categoriesListGet(req, res) {
  const categories = await db.getAllCategories()
  console.log('Categories: ', categories)
  res.send(
    'Categories: ' + categories.map((category) => category.name).join(', ')
  )
}

module.exports = {
  categoriesListGet,
}
