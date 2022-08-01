'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class laporan_kependudukan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  laporan_kependudukan.init({
    RT: DataTypes.INTEGER,
    RW: DataTypes.INTEGER,
    luas_wilayah: DataTypes.TEXT,
    batas_utara: DataTypes.TEXT,
    batas_selatan: DataTypes.TEXT,
    batas_barat: DataTypes.TEXT,
    batas_timur: DataTypes.TEXT,
    jumlah_kk: DataTypes.INTEGER,
    jumlah_pria: DataTypes.INTEGER,
    jumlah_wanita: DataTypes.INTEGER,
    jumlah_usia_kelompok1: DataTypes.INTEGER,
    jumlah_usia_kelompok2: DataTypes.INTEGER,
    jumlah_usia_kelompok3: DataTypes.INTEGER,
    jumlah_usia_kelompok4: DataTypes.INTEGER,
    jumlah_usia_kelompok5: DataTypes.INTEGER,
    jumlah_pendidikan1: DataTypes.INTEGER,
    jumlah_pendidikan2: DataTypes.INTEGER,
    jumlah_pendidikan3: DataTypes.INTEGER,
    jumlah_pendidikan4: DataTypes.INTEGER,
    jumlah_pendidikan5: DataTypes.INTEGER,
    jumlah_pendidikan6: DataTypes.INTEGER,
    jumlah_pendidikan7: DataTypes.INTEGER,
    jumlah_pendidikan8: DataTypes.INTEGER,
    jumlah_pendidikan9: DataTypes.INTEGER,
    jumlah_pendidikan10: DataTypes.INTEGER,
    jumlah_pendidikan11: DataTypes.INTEGER,
    jumlah_pendidikan12: DataTypes.INTEGER,
    jumlah_pendidikan13: DataTypes.INTEGER,
    jumlah_pendidikan14: DataTypes.INTEGER,
    jumlah_pendidikan15: DataTypes.INTEGER,
    jumlah_pendidikan16: DataTypes.INTEGER,
    jumlah_petani: DataTypes.INTEGER,
    jumlah_buruh_tani: DataTypes.INTEGER,
    jumlah_pns: DataTypes.INTEGER,
    jumlah_peternak: DataTypes.INTEGER,
    jumlah_bidan: DataTypes.INTEGER,
    jumlah_tni: DataTypes.INTEGER,
    jumlah_polri: DataTypes.INTEGER,
    jumlah_pengusaha_umkm: DataTypes.INTEGER,
    jumlah_pedagang_keliling: DataTypes.INTEGER,
    jumlah_karyawan_swasta: DataTypes.INTEGER,
    jumlah_purnawirawan_pensiunan: DataTypes.INTEGER,
    jumlah_pengrajin_industri_rt: DataTypes.INTEGER,
    jumlah_ibu_rumah_tangga: DataTypes.INTEGER,
    jumlah_lainnya: DataTypes.INTEGER,
    jumlah_islam: DataTypes.INTEGER,
    jumlah_kristen_protestan: DataTypes.INTEGER,
    jumlah_kristen_katolik: DataTypes.INTEGER,
    jumlah_hindu: DataTypes.INTEGER,
    jumlah_budha: DataTypes.INTEGER,
    jumlah_konghuchu: DataTypes.INTEGER,
    jumlah_agama_lainnya: DataTypes.INTEGER,
    jumlah_tuna_rungu: DataTypes.INTEGER,
    jumlah_tuna_wicara: DataTypes.INTEGER,
    jumlah_tuna_netra: DataTypes.INTEGER,
    jumlah_sumbing: DataTypes.INTEGER,
    jumlah_cacat_fisik: DataTypes.INTEGER,
    jumlah_odgj: DataTypes.INTEGER,
    jumlah_disabilitas: DataTypes.INTEGER,
    jumlah_poskamling: DataTypes.INTEGER,
    jumlah_poskamling_aktif: DataTypes.INTEGER,
    jumlah_poskamling_pasif: DataTypes.INTEGER,
    jumlah_pkh: DataTypes.INTEGER,
    jumlah_pkh_usulan_masuk: DataTypes.INTEGER,
    jumlah_pkh_usulan_keluar: DataTypes.INTEGER,
    jumlah_masjid: DataTypes.INTEGER,
    jumlah_mushola: DataTypes.INTEGER,
    jumlah_gereja: DataTypes.INTEGER,
    jumlah_gedung_tempat_pertemuan: DataTypes.INTEGER,
    jumlah_balai_rtrw: DataTypes.INTEGER,
    jumlah_lapangan_voli: DataTypes.INTEGER,
    jumlah_lapangan_bulutangkis: DataTypes.INTEGER,
    jumlah_lapangan_tenismeja: DataTypes.INTEGER,
    jumlah_fasum_lainnya: DataTypes.INTEGER,
    jumlah_ibu_hamil: DataTypes.INTEGER,
    jumlah_ibu_menyesui: DataTypes.INTEGER,
    jumlah_balita: DataTypes.INTEGER,
    jumlah_lansia: DataTypes.INTEGER,
    jumlah_pawon_urip: DataTypes.INTEGER,
    jumlah_janda: DataTypes.INTEGER,
    jumlah_duda: DataTypes.INTEGER,
    created_date: DataTypes.BIGINT,
    updated_date: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'laporan_kependudukan',
    timestamps: false
  });
  return laporan_kependudukan;
};