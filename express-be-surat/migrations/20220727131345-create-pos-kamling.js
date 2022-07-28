'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pos_kamlings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.TEXT,
      },
      phone: {
        type: Sequelize.STRING,
      },
      keterangan: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('pos_kamlings');
  }
};