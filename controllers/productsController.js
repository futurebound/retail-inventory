const db = require('../db/queries')

async function productsListGet(req, res) {
  const { search } = req.query
  let products

  if (search) {
    products = await db.searchProducts(search)
  } else {
    products = await db.getAllProducts()
  }

  console.log('Products: ', products)
  res.send('Products: ' + products.map((product) => product.name).join(', '))
}

async function productCreatePost(req, res) {
  const { name, description, price, stockQuantity, categoryId, supplierId } =
    req.body
  console.log(
    `saving product name: ${name} description: ${description} price: ${price} 
     stockQuantity: ${stockQuantity} categoryId: ${categoryId} supplierId: ${supplierId}`,
  )
  await db.insertProduct(
    name,
    description,
    price,
    stockQuantity,
    categoryId,
    supplierId,
  )

  res.redirect('/products')
}

async function productUpdatePut(req, res) {
  console.log(`updating product id = ${req.params.id}`)
  const { id } = req.params
  const { name, description, price, stockQuantity, categoryId, supplierId } =
    req.body
  const updated = await db.updateProduct(
    id,
    name,
    description,
    price,
    stockQuantity,
    categoryId,
    supplierId,
  )
  console.log(updated) // TODO: remove log

  if (updated.length > 0) {
    res.status(200).json({ message: 'Product updated successfully.' })
  } else {
    res.status(404).json({ message: 'Product not found. ' })
  }
}

async function productDelete(req, res) {
  console.log(`deleting product id = ${req.params.id}`)
  const { id } = req.params
  const deleted = await db.deleteProduct(id)
  console.log(deleted) // TODO: remove log

  if (deleted.length > 0) {
    res.status(200).json({ message: 'Product deleted successfully.' })
  } else {
    res.status(404).json({ message: 'Product not found. ' })
  }
}

module.exports = {
  productsListGet,
  productCreatePost,
  productUpdatePut,
  productDelete,
}