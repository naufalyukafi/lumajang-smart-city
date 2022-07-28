'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Blog.init({
    label_slug: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    link_banner: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    created_date: DataTypes.BIGINT,
    updated_date: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Blog',
    timestamps: false
  });
  return Blog;
};