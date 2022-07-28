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

     await queryInterface.bulkInsert('user_roles', [
      {
        role_id: 1,
        role_name: 'admin',
        created_by: 1,
        updated_by: 1,
        created_date: 1655533701200,
        updated_date: 1655533701200,
      },
      {
        role_id: 2,
        role_name: 'rt',
        created_by: 1,
        updated_by: 1,
        created_date: 1655533701200,
        updated_date: 1655533701200,
      },
      {
        role_id: 3,
        role_name: 'rw',
        created_by: 1,
        updated_by: 1,
        created_date: 1655533701200,
        updated_date: 1655533701200,
      },
      {
        role_id: 4,
        role_name: 'kim_kegiatan',
        created_by: 1,
        updated_by: 1,
        created_date: 1655533701200,
        updated_date: 1655533701200,
      },
      {
        role_id: 5,
        role_name: 'aduan_masyarakat',
        created_by: 1,
        updated_by: 1,
        created_date: 1655533701200,
        updated_date: 1655533701200,
      },
      {
        role_id: 6,
        role_name: 'fasilitasi_pertanahan',
        created_by: 1,
        updated_by: 1,
        created_date: 1655533701200,
        updated_date: 1655533701200,
      },
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkInsert('user_roles', null, {});
  }
};
