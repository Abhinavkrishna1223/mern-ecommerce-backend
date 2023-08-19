const express = require("express");
const { createOrder } = require("../controller/OrderCntrlr");
const router = express.Router();

// '/categories' is already added in base path //
router.post('/', createOrder)


exports.router = router;