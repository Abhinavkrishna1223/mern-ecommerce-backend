const express = require("express");
const { createCart, fetchCartByUser, updateCart, deleteFromCart } = require("../controller/CartContrlr");
const router = express.Router();

// '/carts' is already added in base path //
router.post('/', createCart).get('/', fetchCartByUser).patch('/:id', updateCart).delete('/:id', deleteFromCart)


exports.router = router;