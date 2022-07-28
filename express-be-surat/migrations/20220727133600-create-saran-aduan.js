'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('saran_aduans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.TEXT
      },
      identitas: {
        type: Sequelize.STRING,
      },
      pekerjaan: {
        type: Sequelize.STRING
      },
      status_kependudukan: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.TEXT
      },
      judul: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('saran_aduans');
  }
};