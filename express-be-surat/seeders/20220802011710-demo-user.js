'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Demo Admin",
          email: "demoadmin@gmail.com",
          picture: "https://upload.wikimedia.org/wikipedia/commons/4/41/Profile-720.png",
          phone: "085607287537",
          password: "$2a$10$NrOF8LPFWYt.MhtJagbamuNBgqTQe1XnO607mg0HO5yOXe9VdY4m2",
          role: 1,
          status: "verifikasi",
          created_by: 1,
          updated_by: 1,
          created_date: 1655533701200,
          updated_date: 1655533701200,
        },
      ],
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
