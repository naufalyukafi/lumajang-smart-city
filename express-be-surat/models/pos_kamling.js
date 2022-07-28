'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pos_kamling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pos_kamling.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    phone: DataTypes.STRING,
    keterangan: DataTypes.TEXT,
    photo: DataTypes.TEXT,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    created_date: DataTypes.BIGINT,
    updated_date: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'pos_kamling',
    timestamps: false
  });
  return pos_kamling;
};