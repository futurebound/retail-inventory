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

async function updateCategory(id, name, description) {
  const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [
    id,
  ])

  if (rows.length > 0) {
    await pool.query(
      'UPDATE categories SET name = $2, description = $3 WHERE id = $1',
      [id, name, description]
    )
  }

  return rows
}

async function deleteCategory(categoryId) {
  const { rows } = await pool.query(
    `DELETE FROM categories WHERE id = $1 RETURNING *`,
    [categoryId]
  )
  return rows
}

/* ===================== SUPPLIERS ===================== */

async function getAllSuppliers() {
  const { rows } = await pool.query('SELECT * FROM suppliers')
  return rows
}

async function searchSuppliers(searchTerm) {
  const { rows } = await pool.query(
    'SELECT * FROM suppliers WHERE name ILIKE $1',
    [`%${searchTerm}%`]
  )
  return rows
}

async function insertSupplier(name, email, phone) {
  await pool.query(
    'INSERT INTO suppliers (name, contact_email, phone_number) VALUES ($1, $2, $3)',
    [name, email, phone]
  )
}

async function updateSupplier(id, name, email, phone) {
  const { rows } = await pool.query('SELECT * FROM suppliers WHERE id = $1', [
    id,
  ])

  if (rows.length > 0) {
    await pool.query(
      'UPDATE suppliers SET name = $2, contact_email = $3, phone_number = $4, updated_at = NOW() WHERE id = $1',
      [id, name, email, phone]
    )
  }

  return rows
}

async function deleteSupplier(id) {
  const { rows } = await pool.query(
    `DELETE FROM suppliers WHERE id = $1 RETURNING *`,
    [id]
  )
  return rows
}

/* ===================== PRODUCTS ===================== */
async function getAllProducts() {
  const { rows } = await pool.query('SELECT * FROM products')
  return rows
}

async function searchProducts(searchTerm) {
  const { rows } = await pool.query(
    'SELECT * FROM products WHERE name ILIKE $1',
    [`%${searchTerm}%`]
  )
  return rows
}

/* ===================== EXPORTS ===================== */

module.exports = {
  getAllCategories,
  searchCategories,
  insertCategory,
  updateCategory,
  deleteCategory,

  getAllSuppliers,
  searchSuppliers,
  insertSupplier,
  updateSupplier,
  deleteSupplier,

  getAllProducts,
  searchProducts,
}
