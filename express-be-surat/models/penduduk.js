'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penduduk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Penduduk.init({
    nama: DataTypes.STRING,
    tanggal_lahir: DataTypes.INTEGER,
    alamat: DataTypes.TEXT,
    RT: DataTypes.INTEGER,
    RW: DataTypes.INTEGER,
    jenis_kelamin: DataTypes.STRING,
    pendidikan: DataTypes.STRING,
    pekerjaan: DataTypes.STRING,
    phone: DataTypes.STRING,
    photo: DataTypes.TEXT,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    created_date: DataTypes.BIGINT,
    updated_date: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Penduduk',
    timestamps: false
  });
  return Penduduk;
};