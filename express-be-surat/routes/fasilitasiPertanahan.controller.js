const Joi = require("joi");
const response = require("../response");
const { fasilitasi_pertanahan } = require("../models");

exports.newFasilitasiPertanahan = async (req, res) => {
    const nama_petugas_1 = req.body.nama_petugas_1
    const nama_petugas_2 = req.body.nama_petugas_2
    const tanggal_ukur = req.body.tanggal_ukur
    const nama_pemilik_tanah = req.body.nama_pemilik_tanah
    const no_ktp = req.body.no_ktp
    const nomor_kohir = req.body.nomor_kohir
    const nomor_persil = req.body.nomor_persil
    const alamat = req.body.alamat
    const panjang_tanah = req.body.panjang_tanah
    const lebar_tanah = req.body.lebar_tanah
    const luas_tanah = req.body.luas_tanah
    const batas_utara = req.body.batas_utara
    const batas_selatan = req.body.batas_selatan
    const batas_barat = req.body.batas_barat
    const batas_timur = req.body.batas_timur
    const sebab_perubahan_status = req.body.sebab_perubahan_status
    const tanggal_perubahan_status = req.body.tanggal_perubahan_status
    const foto_denah = req.body.foto_denah
    const foto_1 = req.body.foto_1
    const foto_2 = req.body.foto_2
    const foto_3 = req.body.foto_3
    const keterangan = req.body.keterangan

    await fasilitasi_pertanahan.create(
        {
            nama_petugas_1,
            nama_petugas_2,
            tanggal_ukur,
            nama_pemilik_tanah,
            no_ktp,
            nomor_kohir,
            nomor_persil,
            alamat,
            panjang_tanah,
            lebar_tanah,
            luas_tanah,
            batas_utara,
            batas_selatan,
            batas_barat,
            batas_timur,
            sebab_perubahan_status,
            tanggal_perubahan_status,
            foto_denah,
            foto_1,
            foto_2,
            foto_3,
            keterangan,
            created_by: 1,
            updated_by: 1,
            created_date: Date.now(),
            updated_date: Date.now(),
        },
        { raw: true }
    )
        .then(async (result) => {
            response.successWithCustomMsg(`Fasilitasi Pertanahan berhasil dibuat!`, result, res);
        })
        .catch((error) => response.internalServerError(error, res));
};

exports.getAllFasilitasiPertanahan = async (req, res) => {
    await fasilitasi_pertanahan
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

exports.updateFasilitasiPertanahan = async (req, res) => {
    const nama_petugas_1 = req.body.nama_petugas_1
    const nama_petugas_2 = req.body.nama_petugas_2
    const tanggal_ukur = req.body.tanggal_ukur
    const nama_pemilik_tanah = req.body.nama_pemilik_tanah
    const no_ktp = req.body.no_ktp
    const nomor_kohir = req.body.nomor_kohir
    const nomor_persil = req.body.nomor_persil
    const alamat = req.body.alamat
    const panjang_tanah = req.body.panjang_tanah
    const lebar_tanah = req.body.lebar_tanah
    const luas_tanah = req.body.luas_tanah
    const batas_utara = req.body.batas_utara
    const batas_selatan = req.body.batas_selatan
    const batas_barat = req.body.batas_barat
    const batas_timur = req.body.batas_timur
    const sebab_perubahan_status = req.body.sebab_perubahan_status
    const tanggal_perubahan_status = req.body.tanggal_perubahan_status
    const foto_denah = req.body.foto_denah
    const foto_1 = req.body.foto_1
    const foto_2 = req.body.foto_2
    const foto_3 = req.body.foto_3
    const keterangan = req.body.keterangan
    await fasilitasi_pertanahan
        .update({
            nama_petugas_1,
            nama_petugas_2,
            tanggal_ukur,
            nama_pemilik_tanah,
            no_ktp,
            nomor_kohir,
            nomor_persil,
            alamat,
            panjang_tanah,
            lebar_tanah,
            luas_tanah,
            batas_utara,
            batas_selatan,
            batas_barat,
            batas_timur,
            sebab_perubahan_status,
            tanggal_perubahan_status,
            foto_denah,
            foto_1,
            foto_2,
            foto_3,
            keterangan,
            created_by: 1,
            updated_by: 1,
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
            return response.successWithCustomMsg(`Fasilitasi Pertanahan berhasil diupdate!`, result, res);
        })
        .catch((error) => {
            return response.internalServerError(error, res);
        });
};

exports.deleteFasilitasiPertanahan = async (req, res) => {
    const schema = Joi.object({
        id: Joi.number().integer().required().messages({
            "any.required": `"id" tidak boleh dikosongi`,
        }),
    });

    const { error } = schema.validate(req.params);
    if (error) return response.errorParams(error.message, res);

    const id = req.params.id;

    await fasilitasi_pertanahan
        .destroy({
            where: { id: id },
        })
        .then(async (result) => {
            response.successWithCustomMsg(`Fasilitasi Pertanahan berhasil dihapus`, result, res);
        })
        .catch((error) => response.internalServerError(error, res));
};