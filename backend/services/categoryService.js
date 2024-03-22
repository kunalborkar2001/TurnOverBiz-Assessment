// services/categoryService.js

const Category = require('../models/Category');
const UserCategory = require('../models/UserCategory');

const getAllCategoriesWithSelections = async (userId) => {
  return Category.findAll({
    include: [
      {
        model: User,
        where: { id: userId },
        attributes: [],
        through: { attributes: [] },
      },
    ],
  });
};

const selectCategories = async (userId, categoryIds) => {
  await UserCategory.destroy({ where: { userId } });
  await UserCategory.bulkCreate(categoryIds.map(categoryId => ({ userId, categoryId })));
};

module.exports = { getAllCategoriesWithSelections, selectCategories };
