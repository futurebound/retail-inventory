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
     stockQuantity: ${stockQuantity} categoryId: ${categoryId} supplierId: ${supplierId}`
  )
  await db.insertProduct(
    name,
    description,
    price,
    stockQuantity,
    categoryId,
    supplierId
  )

  res.redirect('/products')
}

module.exports = {
  productsListGet,
  productCreatePost,
}
