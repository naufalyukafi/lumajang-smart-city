const Joi = require("joi");
const response = require("../response");
const { laporan_kependudukan } = require("../models");

exports.getAllLaporanKependudukan = async (req, res) => {
    await laporan_kependudukan
        .findAll({
            order: [["created_date", "DESC"]],
            raw: true,
        })
        .then(async (result) => {
            return response.success(result, res);
        })
        .catch((error) => {
            return response.internalServerError(error, res);
        });
};

exports.updateLaporanKependudukan = async (req, res) => {
    const RT= req.body.RT;
    const RW= req.body.RW;
    const luas_wilayah= req.body.luas_wilayah;
    const batas_utara= req.body.batas_utara;
    const batas_selatan= req.body.batas_selatan;
    const batas_barat= req.body.batas_barat;
    const batas_timur= req.body.batas_timur;
    const jumlah_kk= req.body.jumlah_kk;
    const jumlah_pria= req.body.jumlah_pria;
    const jumlah_wanita= req.body.jumlah_wanita;
    const jumlah_usia_kelompok1= req.body.jumlah_usia_kelompok1;
    const jumlah_usia_kelompok2= req.body.jumlah_usia_kelompok2;
    const jumlah_usia_kelompok3= req.body.jumlah_usia_kelompok3;
    const jumlah_usia_kelompok4= req.body.jumlah_usia_kelompok4;
    const jumlah_usia_kelompok5= req.body.jumlah_usia_kelompok5;
    const jumlah_pendidikan1= req.body.jumlah_pendidikan1;
    const jumlah_pendidikan2= req.body.jumlah_pendidikan2;
    const jumlah_pendidikan3= req.body.jumlah_pendidikan3;
    const jumlah_pendidikan4= req.body.jumlah_pendidikan4;
    const jumlah_pendidikan5= req.body.jumlah_pendidikan5;
    const jumlah_pendidikan6= req.body.jumlah_pendidikan6;
    const jumlah_pendidikan7= req.body.jumlah_pendidikan7;
    const jumlah_pendidikan8= req.body.jumlah_pendidikan7;
    const jumlah_pendidikan9= req.body.jumlah_pendidikan9;
    const jumlah_pendidikan10= req.body.jumlah_pendidikan10;
    const jumlah_pendidikan11= req.body.jumlah_pendidikan11;
    const jumlah_pendidikan12= req.body.jumlah_pendidikan12;
    const jumlah_pendidikan13= req.body.jumlah_pendidikan13;
    const jumlah_pendidikan14= req.body.jumlah_pendidikan14;
    const jumlah_pendidikan15= req.body.jumlah_pendidikan15;
    const jumlah_pendidikan16= req.body.jumlah_pendidikan16;
    const jumlah_petani= req.body.jumlah_petani;
    const jumlah_buruh_tani= req.body.jumlah_buruh_tani;
    const jumlah_pns= req.body.jumlah_pns;
    const jumlah_peternak= req.body.jumlah_peternak;
    const jumlah_bidan= req.body.jumlah_bidan;
    const jumlah_tni= req.body.jumlah_tni;
    const jumlah_polri= req.body.jumlah_polri;
    const jumlah_pengusaha_umkm= req.body.jumlah_pengusaha_umkm;
    const jumlah_pedagang_keliling= req.body.jumlah_pedagang_keliling;
    const jumlah_karyawan_swasta= req.body.jumlah_karyawan_swasta;
    const jumlah_purnawirawan_pensiunan= req.body.jumlah_purnawirawan_pensiunan;
    const jumlah_pengrajin_industri_rt= req.body.jumlah_pengrajin_industri_rt;
    const jumlah_ibu_rumah_tangga= req.body.jumlah_ibu_rumah_tangga;
    const jumlah_lainnya= req.body.jumlah_lainnya;
    const jumlah_islam= req.body.jumlah_islam;
    const jumlah_kristen_protestan= req.body.jumlah_kristen_protestan;
    const jumlah_kristen_katolik= req.body.jumlah_kristen_katolik;
    const jumlah_hindu= req.body.jumlah_hindu;
    const jumlah_budha= req.body.jumlah_budha;
    const jumlah_konghuchu= req.body.jumlah_konghuchu;
    const jumlah_agama_lainnya= req.body.jumlah_agama_lainnya;
    const jumlah_tuna_rungu= req.body.jumlah_tuna_rungu;
    const jumlah_tuna_wicara= req.body.jumlah_tuna_wicara;
    const jumlah_tuna_netra= req.body.jumlah_tuna_netra;
    const jumlah_sumbing= req.body.jumlah_sumbing;
    const jumlah_cacat_fisik= req.body.jumlah_cacat_fisik;
    const jumlah_odgj= req.body.jumlah_odgj;
    const jumlah_disabilitas= req.body.jumlah_disabilitas;
    const jumlah_poskamling= req.body.jumlah_poskamling;
    const jumlah_poskamling_aktif= req.body.jumlah_poskamling_aktif;
    const jumlah_poskamling_pasif= req.body.jumlah_poskamling_pasif;
    const jumlah_pkh= req.body.jumlah_pkh;
    const jumlah_pkh_usulan_masuk= req.body.jumlah_pkh_usulan_masuk;
    const jumlah_pkh_usulan_keluar= req.body.jumlah_pkh_usulan_keluar;
    const jumlah_masjid= req.body.jumlah_masjid;
    const jumlah_mushola= req.body.jumlah_mushola;
    const jumlah_gereja= req.body.jumlah_gereja;
    const jumlah_gedung_tempat_pertemuan= req.body.jumlah_gedung_tempat_pertemuan;
    const jumlah_balai_rtrw= req.body.jumlah_balai_rtrw;
    const jumlah_lapangan_voli= req.body.jumlah_lapangan_voli;
    const jumlah_lapangan_bulutangkis= req.body.jumlah_lapangan_bulutangkis;
    const jumlah_lapangan_tenismeja= req.body.jumlah_lapangan_tenismeja;
    const jumlah_fasum_lainnya= req.body.jumlah_fasum_lainnya;
    const jumlah_ibu_hamil= req.body.jumlah_ibu_hamil;
    const jumlah_ibu_menyesui= req.body.jumlah_ibu_menyesui;
    const jumlah_balita= req.body.jumlah_balita;
    const jumlah_lansia= req.body.jumlah_lansia;
    const jumlah_pawon_urip= req.body.jumlah_pawon_urip;
    const jumlah_janda= req.body.jumlah_janda;
    const jumlah_duda= req.body.jumlah_duda;

    await laporan_kependudukan
        .update({
            RT,
            RW,
            luas_wilayah,
            batas_utara,
            batas_selatan,
            batas_barat,
            batas_timur,
            jumlah_kk,
            jumlah_pria,
            jumlah_wanita,
            jumlah_usia_kelompok1,
            jumlah_usia_kelompok2,
            jumlah_usia_kelompok3,
            jumlah_usia_kelompok4,
            jumlah_usia_kelompok5,
            jumlah_pendidikan1,
            jumlah_pendidikan2,
            jumlah_pendidikan3,
            jumlah_pendidikan4,
            jumlah_pendidikan5,
            jumlah_pendidikan6,
            jumlah_pendidikan7,
            jumlah_pendidikan8,
            jumlah_pendidikan9,
            jumlah_pendidikan10,
            jumlah_pendidikan11,
            jumlah_pendidikan12,
            jumlah_pendidikan13,
            jumlah_pendidikan14,
            jumlah_pendidikan15,
            jumlah_pendidikan16,
            jumlah_petani,
            jumlah_buruh_tani,
            jumlah_pns,
            jumlah_peternak,
            jumlah_bidan,
            jumlah_tni,
            jumlah_polri,
            jumlah_pengusaha_umkm,
            jumlah_pedagang_keliling,
            jumlah_karyawan_swasta,
            jumlah_purnawirawan_pensiunan,
            jumlah_pengrajin_industri_rt,
            jumlah_ibu_rumah_tangga,
            jumlah_lainnya,
            jumlah_islam,
            jumlah_kristen_protestan,
            jumlah_kristen_katolik,
            jumlah_hindu,
            jumlah_budha,
            jumlah_konghuchu,
            jumlah_agama_lainnya,
            jumlah_tuna_rungu,
            jumlah_tuna_wicara,
            jumlah_tuna_netra,
            jumlah_sumbing,
            jumlah_cacat_fisik,
            jumlah_odgj,
            jumlah_disabilitas,
            jumlah_poskamling,
            jumlah_poskamling_aktif,
            jumlah_poskamling_pasif,
            jumlah_pkh,
            jumlah_pkh_usulan_masuk,
            jumlah_pkh_usulan_keluar,
            jumlah_masjid,
            jumlah_mushola,
            jumlah_gereja,
            jumlah_gedung_tempat_pertemuan,
            jumlah_balai_rtrw,
            jumlah_lapangan_voli,
            jumlah_lapangan_bulutangkis,
            jumlah_lapangan_tenismeja,
            jumlah_fasum_lainnya,
            jumlah_ibu_hamil,
            jumlah_ibu_menyesui,
            jumlah_balita,
            jumlah_lansia,
            jumlah_pawon_urip,
            jumlah_janda,
            jumlah_duda,
            created_date: Date.now(),
            updated_date: Date.now(),
        },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
        .then(async (result) => {
            return response.successWithCustomMsg(`Laporan Kependudukan berhasil diupdate!`, result, res);
        })
        .catch((error) => {
            return response.internalServerError(error, res);
        });
};

exports.deleteLaporanKependudukan = async (req, res) => {
    const schema = Joi.object({
        id: Joi.number().integer().required().messages({
            "any.required": `"id" tidak boleh dikosongi`,
        }),
    });

    const { error } = schema.validate(req.params);
    if (error) return response.errorParams(error.message, res);

    const id = req.params.id;

    await laporan_kependudukan
        .destroy({
            where: { id: id },
        })
        .then(async (result) => {
            response.successWithCustomMsg(`Laporan Kependudukan berhasil dihapus`, result, res);
        })
        .catch((error) => response.internalServerError(error, res));
};