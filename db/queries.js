const pool = require('./pool')

async function getCategory(id) {
  const { rows } = await pool.query(`SELECT * FROM categories WHERE id = $1`, [
    id,
  ])

  return rows
}

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM categories')
  return rows
}

async function searchCategories(searchTerm) {
  const { rows } = await pool.query(
    'SELECT * FROM categories WHERE name ILIKE $1',
    [`%${searchTerm}%`],
  )
  return rows
}

async function insertCategory(name, description) {
  await pool.query(
    'INSERT INTO categories (name, description) VALUES ($1, $2)',
    [name, description],
  )
}

async function updateCategory(id, name, description) {
  // TODO: consider db.getCategory(id) here instead
  const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [
    id,
  ])

  if (rows.length > 0) {
    await pool.query(
      'UPDATE categories SET name = $2, description = $3 WHERE id = $1',
      [id, name, description],
    )
  }

  return rows
}

async function deleteCategory(categoryId) {
  const { rows } = await pool.query(
    `DELETE FROM categories WHERE id = $1 RETURNING *`,
    [categoryId],
  )
  return rows
}

/* ===================== SUPPLIERS ===================== */

async function getSupplier(id) {
  const { rows } = await pool.query(`SELECT * FROM suppliers WHERE id = $1`, [
    id,
  ])

  return rows
}

async function getAllSuppliers() {
  const { rows } = await pool.query('SELECT * FROM suppliers')
  return rows
}

async function searchSuppliers(searchTerm) {
  const { rows } = await pool.query(
    'SELECT * FROM suppliers WHERE name ILIKE $1',
    [`%${searchTerm}%`],
  )
  return rows
}

async function insertSupplier(name, email, phone) {
  const { rows } = await pool.query(
    'INSERT INTO suppliers (name, contact_email, phone_number) VALUES ($1, $2, $3) RETURNING *',
    [name, email, phone],
  )
  return rows
}

async function updateSupplier(id, name, email, phone) {
  const { rows } = await pool.query('SELECT * FROM suppliers WHERE id = $1', [
    id,
  ])

  if (rows.length > 0) {
    await pool.query(
      'UPDATE suppliers SET name = $2, contact_email = $3, phone_number = $4, updated_at = NOW() WHERE id = $1',
      [id, name, email, phone],
    )
  }

  return rows
}

async function deleteSupplier(id) {
  const { rows } = await pool.query(
    `DELETE FROM suppliers WHERE id = $1 RETURNING *`,
    [id],
  )
  return rows
}

/* ===================== PRODUCTS ===================== */

async function getProduct(id) {
  const { rows } = await pool.query(`SELECT * FROM products WHERE id = $1`, [
    id,
  ])

  return rows
}

async function getAllProducts() {
  const { rows } = await pool.query('SELECT * FROM products')
  return rows
}

async function getProductsByCategory(id) {
  const { rows } = await pool.query(
    'SELECT * FROM products WHERE category_id = $1',
    [id],
  )
  return rows
}

async function getProductsBySupplier(id) {
  const { rows } = await pool.query(
    'SELECT * FROM products WHERE supplier_id = $1',
    [id],
  )
  return rows
}

async function searchProducts(searchTerm) {
  const { rows } = await pool.query(
    'SELECT * FROM products WHERE name ILIKE $1',
    [`%${searchTerm}%`],
  )
  return rows
}

async function insertProduct(
  name,
  description,
  price,
  stockQuantity,
  categoryId,
  supplierId,
) {
  const { rows } = await pool.query(
    `INSERT INTO products (
        name, description, price, stock_quantity, category_id, supplier_id
      ) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *`,
    [name, description, price, stockQuantity, categoryId, supplierId],
  )

  return rows
}

async function updateProduct(
  id,
  name,
  description,
  price,
  stockQuantity,
  categoryId,
  supplierId,
) {
  const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [
    id,
  ])
  console.log('before update: ', rows)

  // TODO: add confirmation that categoryId and supplierId both valid

  if (rows.length > 0) {
    await pool.query(
      `UPDATE products 
        SET 
          name = $2, 
          description = $3,
          price = $4, 
          stock_quantity = $5, 
          category_id = $6, 
          supplier_id = $7, 
          updated_at = NOW()
        WHERE
          id = $1;`,
      [id, name, description, price, stockQuantity, categoryId, supplierId],
    )
  }

  return rows
}

async function deleteProduct(id) {
  const { rows } = await pool.query(
    `DELETE FROM products WHERE id = $1 RETURNING *`,
    [id],
  )
  return rows
}

/* ===================== EXPORTS ===================== */

module.exports = {
  getCategory,
  getAllCategories,
  searchCategories,
  insertCategory,
  updateCategory,
  deleteCategory,

  getSupplier,
  getAllSuppliers,
  searchSuppliers,
  insertSupplier,
  updateSupplier,
  deleteSupplier,

  getProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsBySupplier,
  searchProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
}
