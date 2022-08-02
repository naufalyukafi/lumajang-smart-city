'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: { 
        type: Sequelize.INTEGER
      },
      created_by: { 
        type: Sequelize.INTEGER
      },
      updated_by: { 
        type: Sequelize.INTEGER
      },
      created_date: { 
        type: Sequelize.BIGINT
      },
      updated_date: { 
        type: Sequelize.BIGINT
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};