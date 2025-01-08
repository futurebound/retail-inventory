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

async function insertCategory(name, description) {
  await pool.query(
    'INSERT INTO categories (name, description) VALUES ($1, $2)',
    [name, description]
  )
}

async function deleteCategory(categoryId) {
  const { rows } = await pool.query(
    `DELETE FROM categories WHERE id = $1 RETURNING *`,
    [categoryId]
  )
  return rows
}

module.exports = {
  getAllCategories,
  searchCategories,
  insertCategory,
  deleteCategory,
}
