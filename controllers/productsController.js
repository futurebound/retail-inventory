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

module.exports = {
  productsListGet,
}
