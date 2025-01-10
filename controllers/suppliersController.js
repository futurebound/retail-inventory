const db = require('../db/queries')

async function supplierGet(req, res) {
  const { id } = req.params
  supplier = await db.getSupplier(id)
  if (supplier.length > 0) {
    res.json({ supplier: supplier })
  } else {
    res.status(404).json({ supplier: 'Supplier not found. ' })
  }
}

async function suppliersListGet(req, res) {
  const { search } = req.query
  let suppliers

  if (search) {
    suppliers = await db.searchSuppliers(search)
  } else {
    suppliers = await db.getAllSuppliers()
  }

  res.json({ suppliers: suppliers })
}

async function supplierCreatePost(req, res) {
  console.log(
    `saving supplier name: ${req.body.name} email: ${req.body.email} phone: ${req.body.phone}`,
  )
  const { name, email, phone } = req.body
  const supplier = await db.insertSupplier(name, email, phone)
  res.status(201).json({ supplier: supplier })
}

async function supplierUpdatePut(req, res) {
  console.log(`udpating supplier id = ${req.params.id}`)
  const { id } = req.params
  const { name, email, phone } = req.body
  const updated = await db.updateSupplier(id, name, email, phone)
  console.log(updated) // TODO: remove log

  if (updated.length > 0) {
    res.json({ message: 'Supplier updated successfully.' })
  } else {
    res.status(404).json({ message: 'Supplier not found. ' })
  }
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
  supplierGet,
  supplierCreatePost,
  supplierUpdatePut,
  supplierDelete,
}
