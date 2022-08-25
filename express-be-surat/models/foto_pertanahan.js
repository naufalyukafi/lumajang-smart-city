'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class foto_pertanahan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  foto_pertanahan.init({
    pertanahan_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    created_date: DataTypes.BIGINT,
    updated_date: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'foto_pertanahan',
    timestamps: false
  });
  return foto_pertanahan;
};