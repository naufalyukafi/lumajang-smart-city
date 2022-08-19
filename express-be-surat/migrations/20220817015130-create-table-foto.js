'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('table_fotos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blog_id: {
        type: Sequelize.INTEGER,
      },
      caption: {
        type: Sequelize.STRING,
      },
      deskripsi: {
        type: Sequelize.TEXT,
      },
      image_url: {
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
    await queryInterface.dropTable('table_fotos');
  }
};