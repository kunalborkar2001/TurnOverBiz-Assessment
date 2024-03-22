// controllers/categoryController.js

const categoryService = require('../services/categoryService');

const getAllCategoriesWithSelections = async (req, res) => {
  try {
    const userId = req.user.id;
    const categories = await categoryService.getAllCategoriesWithSelections(userId);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const selectCategories = async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryIds } = req.body;
    await categoryService.selectCategories(userId, categoryIds);
    res.status(200).json({ message: 'Categories selected successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllCategoriesWithSelections, selectCategories };
