const express = require("express");
const { fetchUsersById, updateUsersById } = require("../controller/User");


const router = express.Router();

// '/products' is already added in base path //
router.get('/own', fetchUsersById)
    .patch('/:id', updateUsersById)


exports.router = router;