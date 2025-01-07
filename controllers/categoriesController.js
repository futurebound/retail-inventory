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

module.exports = {
  categoriesListGet,
}
