const pool = require('./pool')

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM categories')
  return rows
}

async function searchCategories(searchTerm) {
  const { rows } = await pool.query(
    'SELECT * FROM categories WHERE name ILIKE $1',
    [`%${searchTerm}%`]
  )
  return rows
}

module.exports = {
  getAllCategories,
  searchCategories,
}
