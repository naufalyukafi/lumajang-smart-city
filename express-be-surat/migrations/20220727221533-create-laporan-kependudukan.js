'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('laporan_kependudukans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RT: {
        type: Sequelize.INTEGER
      },
      RW: {
        type: Sequelize.INTEGER
      },
      tanggal_pelaporan: {
        type: Sequelize.BIGINT
      },
      luas_wilayah: {
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
      jumlah_kk: {
        type: Sequelize.INTEGER
      },
      jumlah_pria: {
        type: Sequelize.INTEGER
      },
      jumlah_wanita: {
        type: Sequelize.INTEGER
      },
      jumlah_usia_kelompok1: {
        type: Sequelize.INTEGER
      },
      jumlah_usia_kelompok2: {
        type: Sequelize.INTEGER
      },
      jumlah_usia_kelompok3: {
        type: Sequelize.INTEGER
      },
      jumlah_usia_kelompok4: {
        type: Sequelize.INTEGER
      },
      jumlah_usia_kelompok5: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan1: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan2: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan3: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan4: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan5: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan6: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan7: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan8: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan9: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan10: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan11: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan12: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan13: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan14: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan15: {
        type: Sequelize.INTEGER
      },
      jumlah_pendidikan16: {
        type: Sequelize.INTEGER
      },
      jumlah_petani: {
        type: Sequelize.INTEGER
      },
      jumlah_buruh_tani: {
        type: Sequelize.INTEGER
      },
      jumlah_pns: {
        type: Sequelize.INTEGER
      },
      jumlah_peternak: {
        type: Sequelize.INTEGER
      },
      jumlah_bidan: {
        type: Sequelize.INTEGER
      },
      jumlah_tni: {
        type: Sequelize.INTEGER
      },
      jumlah_polri: {
        type: Sequelize.INTEGER
      },
      jumlah_pengusaha_umkm: {
        type: Sequelize.INTEGER
      },
      jumlah_pedagang_keliling: {
        type: Sequelize.INTEGER
      },
      jumlah_karyawan_swasta: {
        type: Sequelize.INTEGER
      },
      jumlah_purnawirawan_pensiunan: {
        type: Sequelize.INTEGER
      },
      jumlah_pengrajin_industri_rt: {
        type: Sequelize.INTEGER
      },
      jumlah_ibu_rumah_tangga: {
        type: Sequelize.INTEGER
      },
      jumlah_lainnya: {
        type: Sequelize.INTEGER
      },
      jumlah_islam: {
        type: Sequelize.INTEGER
      },
      jumlah_kristen_protestan: {
        type: Sequelize.INTEGER
      },
      jumlah_kristen_katolik: {
        type: Sequelize.INTEGER
      },
      jumlah_hindu: {
        type: Sequelize.INTEGER
      },
      jumlah_budha: {
        type: Sequelize.INTEGER
      },
      jumlah_konghuchu: {
        type: Sequelize.INTEGER
      },
      jumlah_agama_lainnya: {
        type: Sequelize.INTEGER
      },
      jumlah_tuna_rungu: {
        type: Sequelize.INTEGER
      },
      jumlah_tuna_wicara: {
        type: Sequelize.INTEGER
      },
      jumlah_tuna_netra: {
        type: Sequelize.INTEGER
      },
      jumlah_sumbing: {
        type: Sequelize.INTEGER
      },
      jumlah_cacat_fisik: {
        type: Sequelize.INTEGER
      },
      jumlah_odgj: {
        type: Sequelize.INTEGER
      },
      jumlah_disabilitas: {
        type: Sequelize.INTEGER
      },
      jumlah_poskamling: {
        type: Sequelize.INTEGER
      },
      jumlah_poskamling_aktif: {
        type: Sequelize.INTEGER
      },
      jumlah_poskamling_pasif: {
        type: Sequelize.INTEGER
      },
      jumlah_pkh: {
        type: Sequelize.INTEGER
      },
      jumlah_pkh_usulan_masuk: {
        type: Sequelize.INTEGER
      },
      jumlah_pkh_usulan_keluar: {
        type: Sequelize.INTEGER
      },
      jumlah_masjid: {
        type: Sequelize.INTEGER
      },
      jumlah_mushola: {
        type: Sequelize.INTEGER
      },
      jumlah_gereja: {
        type: Sequelize.INTEGER
      },
      jumlah_gedung_tempat_pertemuan: {
        type: Sequelize.INTEGER
      },
      jumlah_balai_rtrw: {
        type: Sequelize.INTEGER
      },
      jumlah_lapangan_voli: {
        type: Sequelize.INTEGER
      },
      jumlah_lapangan_bulutangkis: {
        type: Sequelize.INTEGER
      },
      jumlah_lapangan_tenismeja: {
        type: Sequelize.INTEGER
      },
      jumlah_fasum_lainnya: {
        type: Sequelize.INTEGER
      },
      jumlah_ibu_hamil: {
        type: Sequelize.INTEGER
      },
      jumlah_ibu_menyesui: {
        type: Sequelize.INTEGER
      },
      jumlah_balita: {
        type: Sequelize.INTEGER
      },
      jumlah_lansia: {
        type: Sequelize.INTEGER
      },
      jumlah_pawon_urip: {
        type: Sequelize.INTEGER
      },
      jumlah_janda: {
        type: Sequelize.INTEGER
      },
      jumlah_duda: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('laporan_kependudukans');
  }
};