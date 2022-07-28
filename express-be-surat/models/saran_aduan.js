'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class saran_aduan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  saran_aduan.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    photo: DataTypes.TEXT,
    identitas: DataTypes.STRING,
    pekerjaan: DataTypes.STRING,
    status_kependudukan: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    judul: DataTypes.STRING,
    message: DataTypes.TEXT,
    status: DataTypes.STRING,
    created_date: DataTypes.BIGINT,
    updated_date: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'saran_aduan',
    timestamps: false
  });
  return saran_aduan;
};