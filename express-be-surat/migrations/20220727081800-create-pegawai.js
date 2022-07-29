'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pegawais', {
      nik: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.TEXT,
      },
      jabatan: {
        type: Sequelize.STRING,
      },
      NIP: {
        type: Sequelize.INTEGER,
      },
      tanggal_lahir: {
        type: Sequelize.INTEGER,
      },
      phone: {
        type: Sequelize.STRING,
      },
      photo: {
        type: Sequelize.TEXT,
      },
      RT: {
        type: Sequelize.INTEGER,
      },
      RW: {
        type: Sequelize.INTEGER,
      },
      keterangan: {
        type: Sequelize.TEXT
      },
      nomor_sk: {
        type: Sequelize.BIGINT
      },
      tanggal_sk: {
        type: Sequelize.BIGINT
      },
      tanggal_akhir_sk: {
        type: Sequelize.BIGINT
      },
      role_pegawai: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('pegawais');
  }
};