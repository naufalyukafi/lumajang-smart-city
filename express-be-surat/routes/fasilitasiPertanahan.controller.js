const Joi = require("joi");
const response = require("../response");
const { fasilitasi_pertanahan, foto_pertanahan } = require("../models");

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
    const koordinat_utara = req.body.koordinat_utara
    const koordinat_barat = req.body.koordinat_barat
    const koordinat_selatan = req.body.koordinat_selatan
    const koordinat_timur = req.body.koordinat_timur
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
            koordinat_utara,
            koordinat_barat,
            koordinat_selatan,
            koordinat_timur,
            keterangan,
            created_by: req.auth.id,
            updated_by: req.auth.id,
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

exports.getEmployeFasilitasiPertanahan = async (req, res) => {
    await fasilitasi_pertanahan
        .findAll({
            order: [["created_date", "DESC"]],
            raw: true,
            where: {
                updated_by: req.auth.id,
            },
        })
        .then(async (result) => {
            return response.success(result, res);
        })
        .catch((error) => {
            return response.internalServerError(error, res);
        });
};

exports.getDetailFasilitsaiPertanahan = async (req, res) => {
    const schema = Joi.object({
        id: Joi.string().min(1).max(75).required(),
    });

    const { error } = schema.validate(req.params);
    if (error) return response.errorParams(error.message, res);

    const id = req.params.id;

    await fasilitasi_pertanahan.findOne({
        where: { id: id },
        raw: true,
    })
        .then(async (result) => {
            if (result) {
                await foto_pertanahan.findAll({
                    where: { pertanahan_id: result.id },
                }).then((data) => {
                    return response.success({ ...result, listpertanahan: data }, res);
                }).catch((error) => response.internalServerError(error, res));
            } else {
                return response.successWithErrorMsg("Data tidak ditemukan", res);
            }
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
    const koordinat_utara = req.body.koordinat_utara
    const koordinat_barat = req.body.koordinat_barat
    const koordinat_selatan = req.body.koordinat_selatan
    const koordinat_timur = req.body.koordinat_timur
    const keterangan = req.body.keterangan
    console.log(req.auth.id)
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
            koordinat_utara,
            koordinat_barat,
            koordinat_selatan,
            koordinat_timur,
            keterangan,
            created_by: req.auth.id,
            updated_by: req.auth.id,
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