const express = require("express");
const { createProduct, fetchAllProducts, fetchProductsById, updateProductsById } = require("../controller/Product");

const router = express.Router();

// '/products' is already added in base path //
router.post('/', createProduct)
    .get('/', fetchAllProducts)
    .get('/:id', fetchProductsById)
    .patch('/:id', updateProductsById)


exports.router = router;