// models/UserCategory.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Category = require('./Category');

const UserCategory = sequelize.define('UserCategory', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.belongsToMany(Category, { through: UserCategory });
Category.belongsToMany(User, { through: UserCategory });

module.exports = UserCategory;
