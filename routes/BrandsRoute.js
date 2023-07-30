const express = require("express");
const { fetchBrands, createBrands } = require("../controller/BrandsContrlr");
const router = express.Router();

// '/brands' is already added in base path //
router.post('/', createBrands).get('/', fetchBrands)


exports.router = router;