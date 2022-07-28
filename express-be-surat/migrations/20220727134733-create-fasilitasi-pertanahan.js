'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fasilitasi_pertanahans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_petugas_1: {
        type: Sequelize.STRING
      },
      nama_petugas_2: {
        type: Sequelize.STRING
      },
      tanggal_ukur: {
        type: Sequelize.BIGINT
      },
      nama_pemilik_tanah: {
        type: Sequelize.STRING
      },
      no_ktp: {
        type: Sequelize.STRING
      },
      nomor_kohir: {
        type: Sequelize.INTEGER
      },
      nomor_persil: {
        type: Sequelize.INTEGER
      },
      alamat: {
        type: Sequelize.TEXT
      },
      panjang_tanah: {
        type: Sequelize.INTEGER
      },
      lebar_tanah: {
        type: Sequelize.INTEGER
      },
      luas_tanah: {
        type: Sequelize.INTEGER
      },
      batas_utara: {
        type: Sequelize.TEXT
      },
      batas_selatan: {
        type: Sequelize.TEXT
      },
      batas_barat: {
        type: Sequelize.TEXT
      },
      batas_timur: {
        type: Sequelize.TEXT
      },
      sebab_perubahan_status: {
        type: Sequelize.TEXT
      },
      tanggal_perubahan_status: {
        type: Sequelize.BIGINT
      },
      foto_denah: {
        type: Sequelize.TEXT
      },
      foto_1: {
        type: Sequelize.TEXT
      },
      foto_2: {
        type: Sequelize.TEXT
      },
      foto_3: {
        type: Sequelize.TEXT
      },
      keterangan: {
        type: Sequelize.TEXT
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      updated_by: {
        type: Sequelize.INTEGER,
      },
      created_date: {
        type: Sequelize.BIGINT,
      },
      updated_date: {
        type: Sequelize.BIGINT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('fasilitasi_pertanahans');
  }
};