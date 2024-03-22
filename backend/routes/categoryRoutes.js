// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateUser } = require('../middleware/authenticate');

// Get all categories with user selections
router.get('/', authenticateUser, categoryController.getAllCategoriesWithSelections);

// Select categories
router.post('/select', authenticateUser, categoryController.selectCategories);

module.exports = router;
