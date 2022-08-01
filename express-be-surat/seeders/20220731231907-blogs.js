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
      "blogs",
      [
        {
          id: 1,
          label_slug: "lumajang-gerakan-kerja-bakti",
          title: "Lumajang Gerakan Kerja Bakti",
          content: `{"time":1656437898197,"blocks":[{"id":"-EOgKOCWTd","type":"image","data":{"file":{"url":"https://kampoengkajoetangan.com/_nuxt/img/gerakan-romantisme.da67936.jpg"},"caption":"","withBorder":false,"stretched":false,"withBackground":false}},{"id":"3MmIfMWiQ1","type":"paragraph","data":{"text":"Selamat Datang Nawak Jadoel!Selamat Datang Nawak Jadoel!"}},{"id":"trFqnb1yQI","type":"paragraph","data":{"text":"Kajoetangan sebagai wisata heritage Kota Malang memberikan romantisme tempo dulu yang memantik semangat kolaborasi melalui kebebasan berekspresi dan melahirkan warna-warni kreasi."}}],"version":"2.24.3"}`,
          link_banner: "",
          status: true,
          created_by: 1,
          updated_by: 1,
          created_date: 1655533701200,
          updated_date: 1655533701200,
        },
        {
          id: 2,
          label_slug: "senduro-sehat",
          title: "Senduro Sehat",
          content: `{"time":1656437898197,"blocks":[{"id":"-EOgKOCWTd","type":"image","data":{"file":{"url":"https://kampoengkajoetangan.com/_nuxt/img/gerakan-romantisme.da67936.jpg"},"caption":"","withBorder":false,"stretched":false,"withBackground":false}},{"id":"3MmIfMWiQ1","type":"paragraph","data":{"text":"Selamat Datang Nawak Jadoel!Selamat Datang Nawak Jadoel!"}},{"id":"trFqnb1yQI","type":"paragraph","data":{"text":"Kajoetangan sebagai wisata heritage Kota Malang memberikan romantisme tempo dulu yang memantik semangat kolaborasi melalui kebebasan berekspresi dan melahirkan warna-warni kreasi."}}],"version":"2.24.3"}`,
          link_banner: "",
          status: true,
          created_by: 1,
          updated_by: 1,
          created_date: 1655533701200,
          updated_date: 1655533701200,
        },

      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("blogs", null, {});
  }
};
