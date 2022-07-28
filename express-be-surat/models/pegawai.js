'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pegawai.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    jabatan: DataTypes.STRING,
    NIP: DataTypes.INTEGER,
    tanggal_lahir: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    photo: DataTypes.TEXT,
    RT: DataTypes.INTEGER,
    RW: DataTypes.INTEGER,
    keterangan: DataTypes.TEXT,
    nomor_sk: DataTypes.BIGINT,
    tanggal_sk: DataTypes.BIGINT,
    tanggal_akhir_sk: DataTypes.BIGINT,
    role_pegawai: DataTypes.STRING,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    created_date: DataTypes.BIGINT,
    updated_date: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'pegawai',
    timestamps: false
  });
  return pegawai;
};