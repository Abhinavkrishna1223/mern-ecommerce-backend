const express = require("express");
const { fetchCategory, createCategories } = require("../controller/CategoryContrlr");
const router = express.Router();

// '/categories' is already added in base path //
router.post('/', createCategories).get('/', fetchCategory)


exports.router = router;