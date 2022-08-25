'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fasilitasi_pertanahan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fasilitasi_pertanahan.init({
    nama_petugas_1: DataTypes.STRING,
    nama_petugas_2: DataTypes.STRING,
    tanggal_ukur: DataTypes.BIGINT,
    nama_pemilik_tanah: DataTypes.STRING,
    no_ktp: DataTypes.STRING,
    nomor_kohir: DataTypes.INTEGER,
    nomor_persil: DataTypes.INTEGER,
    alamat: DataTypes.TEXT,
    panjang_tanah: DataTypes.INTEGER,
    lebar_tanah: DataTypes.INTEGER,
    luas_tanah: DataTypes.INTEGER,
    batas_utara: DataTypes.TEXT,
    batas_selatan: DataTypes.TEXT,
    batas_barat: DataTypes.TEXT,
    batas_timur: DataTypes.TEXT,
    sebab_perubahan_status: DataTypes.TEXT,
    tanggal_perubahan_status: DataTypes.BIGINT,
    koordinat_utara: DataTypes.BIGINT,
    koordinat_selatan: DataTypes.BIGINT,
    koordinat_timur: DataTypes.BIGINT,
    koordinat_barat: DataTypes.BIGINT,
    keterangan: DataTypes.TEXT,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    created_date: DataTypes.BIGINT,
    updated_date: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'fasilitasi_pertanahan',
    timestamps: false
  });
  return fasilitasi_pertanahan;
};