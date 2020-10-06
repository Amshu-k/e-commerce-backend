const express = require('express');
const { requireSignIn, adminMiddleware } = require('../common-middleware');
const { createCategory, getCategories } = require('../controller/category');
const router = express.Router();

router.post('/categories/create', requireSignIn, adminMiddleware, createCategory);
router.get('/categories', getCategories)
module.exports = router;