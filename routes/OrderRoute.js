const express = require("express");
const { createOrder, fetchOrderByUser } = require("../controller/OrderCntrlr");
const router = express.Router();

// '/categories' is already added in base path //
router.post('/', createOrder).get("/", fetchOrderByUser)


exports.router = router;