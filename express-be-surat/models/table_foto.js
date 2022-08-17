'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class table_foto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  table_foto.init({
    blog_id: DataTypes.INTEGER,
    caption: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    created_date: DataTypes.BIGINT,
    updated_date: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'table_foto',
    timestamps: false
  });
  return table_foto;
};