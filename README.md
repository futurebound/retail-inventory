# Retail Inventory Management Application

This application models a full retail store inventory management backend.

## Summary

It is designed to be adapted to any online or in-person retailer, enabling storage, querying and data processing of:

- Products
- Categories (of Products)
- Suppliers (of Products)
- Sales
- Sale Items (multiple Products in single Sale)
- Customers

## Installation

```bash
pnpm install
```

## Database Schema

![](./public/Inventory%20Project%20Database%20Schema.png)

## Business Logic

## Implementation Tasks

### Milestone 1: Contollers, Routes, Views for Categories, Suppliers and Products

Categories

- [x] CREATE a new Category
- [x] READ single Category by id
- [x] READ all Categories
- [x] READ Categories by fuzzy search
- [x] UPDATE a Category
- [x] DELETE a Category

Suppliers

- [x] CREATE a new Supplier
- [x] READ single Supplier by id
- [x] READ all Suppliers
- [x] READ Suppliers by fuzzy search
- [x] UPDATE a Supplier
- [x] DELETE a Supplier

Products

- [x] CREATE a new Product
- [x] READ all Products
- [x] READ Products by fuzzy search
- [x] READ a single Product
- [x] READ all Products by Category
- [x] READ all Product by Supplier
- [x] UPDATE a Product
- [x] DELETE a Product

**Before proceeding, confirm the following behavior:**

- [x] Can query to view all Products associated with a single Supplier
- [x] Can query to view all Products associated with a single Category

### Milestone 2 - Confirm Routes, Controllers

## Tech Stack
