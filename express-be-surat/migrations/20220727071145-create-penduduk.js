'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('penduduks', {
      nik: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      tanggal_lahir: {
        type: Sequelize.INTEGER,
      },
      alamat: {
        type: Sequelize.TEXT,
      },
      RT: {
        type: Sequelize.INTEGER,
      },
      RW: {
        type: Sequelize.INTEGER,
      },
      jenis_kelamin: {
        type: Sequelize.STRING,
      },
      pendidikan: {
        type: Sequelize.STRING,
      },
      pekerjaan: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      photo: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('penduduks');
  }
};