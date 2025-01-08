const db = require('../db/queries')

async function suppliersListGet(req, res) {
  const { search } = req.query
  let suppliers

  if (search) {
    suppliers = await db.searchSuppliers(search)
  } else {
    suppliers = await db.getAllSuppliers()
  }

  console.log('Suppliers: ', suppliers)
  res.send(
    'Suppliers: ' + suppliers.map((supplier) => supplier.name).join(', ')
  )
}

async function supplierCreatePost(req, res) {
  console.log(
    `saving supplier name: ${req.body.name} email: ${req.body.email} phone: ${req.body.phone}`
  )
  const { name, email, phone } = req.body
  await db.insertSupplier(name, email, phone)

  // TODO: consider where to redirect
  res.redirect('/suppliers')
}

async function supplierUpdatePut(req, res) {
  console.log(`udpating supplier id = ${req.params.id}`)
  const { id } = req.params
  const { name, email, phone } = req.body
  const updated = await db.updateSupplier(id, name, email, phone)
  console.log(updated) // TODO: remove log

  if (updated.length > 0) {
    res.status(200).json({ message: 'Supplier updated successfully.' })
  } else {
    res.status(404).json({ message: 'Supplier not found. ' })
  }

  // TODO: consider where to redirect
  // res.redirect('/suppliers')
}

async function supplierDelete(req, res) {
  console.log(`deleting supplier id = ${req.params.id}`)
  const { id } = req.params
  const deleted = await db.deleteSupplier(id)
  console.log(deleted) // TODO: remove log

  if (deleted.length > 0) {
    res.status(200).json({ message: 'Supplier deleted successfully.' })
  } else {
    res.status(404).json({ message: 'Supplier not found. ' })
  }

  // TODO: consider where to redirect
  // res.redirect('/suppliers')
}

module.exports = {
  suppliersListGet,
  supplierCreatePost,
  supplierUpdatePut,
  supplierDelete,
}
