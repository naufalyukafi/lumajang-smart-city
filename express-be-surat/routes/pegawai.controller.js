const Joi = require("joi");
const response = require("../response");
const { pegawai } = require("../models");

exports.newPegawai = async (req, res) => {
    const schema = Joi.object({
        nik: Joi.string().min(8).max(250).required().messages({
            "any.required": `"NIK" tidak boleh dikosongi`,
        }),
        NIP: Joi.string().min(8).max(250),
        nama: Joi.string().min(3).max(250).required().messages({
            "any.required": `"nama" tidak boleh dikosongi`,
        }),
        tanggal_lahir: Joi.string().min(5).max(250).required().messages({
            "any.required": `"tanggal_lahir" tidak boleh dikosongi`,
        }),
        alamat: Joi.string().min(3).max(250).required().messages({
            "any.required": `"alamat" tidak boleh dikosongi`,
        }),
        jabatan: Joi.string().min(3).max(250).required().messages({
            "any.required": `"alamat" tidak boleh dikosongi`,
        }),
        role_pegawai: Joi.string().min(2).max(250).required().messages({
            "any.required": `"Role" tidak boleh dikosongi`,
        }),
        phone: Joi.string().min(3).max(14).required().messages({
            "any.required": `"phone" tidak boleh dikosongi`,
        }),
        photo: Joi.string().min(3).max(255),
        RT: Joi.string().min(2).max(255),
        RW: Joi.string().min(2).max(255),
        keterangan: Joi.string().min(3).max(250),
        nomor_sk: Joi.string().min(3).max(250),
        tanggal_sk: Joi.string().min(3).max(250),
        tanggal_akhir_sk: Joi.string().min(3).max(250),
    });

    const { error } = schema.validate(req.body);
    if (error) return response.errorParams(error.message, res);

    const nik = req.body.nik;
    const nama = req.body.nama;
    const alamat = req.body.alamat;
    const jabatan = req.body.jabatan;
    const NIP = req.body.NIP;
    const tanggal_lahir = req.body.tanggal_lahir;
    const phone = req.body.phone;
    const photo = req.body.photo;
    const RT = req.body.RT;
    const RW = req.body.RW;
    const keterangan = req.body.keterangan;
    const nomor_sk = req.body.nomor_sk;
    const tanggal_sk = req.body.tanggal_sk;
    const tanggal_akhir_sk = req.body.tanggal_akhir_sk;
    const role_pegawai = req.body.role_pegawai;

    await pegawai.create(
        {
            nik,
            nama,
            alamat,
            jabatan,
            NIP,
            tanggal_lahir,
            phone,
            photo,
            RT,
            RW,
            keterangan,
            nomor_sk,
            tanggal_sk,
            tanggal_akhir_sk,
            role_pegawai,
            created_by: 1,
            updated_by: 1,
            created_date: Date.now(),
            updated_date: Date.now(),
        },
        { raw: true }
    )
        .then(async (result) => {
            response.successWithCustomMsg(`pegawai berhasil dibuat!`, result, res);
        })
        .catch((error) => response.internalServerError(error, res));
};

exports.getAllPegawai = async (req, res) => {
    const schema = Joi.object({
        role: Joi.string().min(2).max(75).required(),
    });

    const { error } = schema.validate(req.params);
    if (error) return response.errorParams(error.message, res);

    const role = req.params.role;
    
    await pegawai.findAll({
        where: {role_pegawai: role},
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

exports.updatePegawai = async (req, res) => {
    const schema = Joi.object({
        nama: Joi.string().min(3).max(250).required().messages({
            "any.required": `"nama" tidak boleh dikosongi`,
        }),
        tanggal_lahir: Joi.string().min(5).max(250).required().messages({
            "any.required": `"tanggal_lahir" tidak boleh dikosongi`,
        }),
        alamat: Joi.string().min(3).max(250).required().messages({
            "any.required": `"alamat" tidak boleh dikosongi`,
        }),
        jabatan: Joi.string().min(3).max(250).required().messages({
            "any.required": `"alamat" tidak boleh dikosongi`,
        }),
        phone: Joi.string().min(3).max(14).required().messages({
            "any.required": `"phone" tidak boleh dikosongi`,
        }),
        photo: Joi.string().min(3).max(255),
        RT: Joi.string().min(2).max(255),
        RW: Joi.string().min(2).max(255),
        keterangan: Joi.string().min(3).max(250),
        nomor_sk: Joi.string().min(3).max(250),
        tanggal_sk: Joi.string().min(3).max(250),
        tanggal_akhir_sk: Joi.string().min(3).max(250)
    });

    const { error } = schema.validate(req.body);
    if (error) return response.errorParams(error.message, res);

    const nama = req.body.nama;
    const alamat = req.body.alamat;
    const jabatan = req.body.jabatan;
    const tanggal_lahir = req.body.tanggal_lahir;
    const phone = req.body.phone;
    const photo = req.body.photo;
    const RT = req.body.RT;
    const RW = req.body.RW;
    const keterangan = req.body.keterangan;
    const nomor_sk = req.body.nomor_sk;
    const tanggal_sk = req.body.tanggal_sk;
    const tanggal_akhir_sk = req.body.tanggal_akhir_sk;

    await pegawai.update({
        nama,
        alamat,
        jabatan,
        tanggal_lahir,
        phone,
        photo,
        RT,
        RW,
        keterangan,
        nomor_sk,
        tanggal_sk,
        tanggal_akhir_sk,
        created_by: 1,
        updated_by: 1,
        created_date: Date.now(),
        updated_date: Date.now(),
    },
        {
            where: {
                nik: req.params.nik,
            },
        }
    )
        .then(async (result) => {
            return response.successWithCustomMsg(`pegawai berhasil diupdate!`, result, res);
        })
        .catch((error) => {
            return response.internalServerError(error, res);
        });
};

exports.deletePegawai = async (req, res) => {
    const schema = Joi.object({
        nik: Joi.number().integer().required().messages({
            "any.required": `"NIK" tidak boleh dikosongi`,
        }),
    });

    const { error } = schema.validate(req.params);
    if (error) return response.errorParams(error.message, res);

    const nik = req.params.nik;

    await pegawai.destroy({
        where: { nik: nik },
    })
        .then(async (result) => {
            response.successWithCustomMsg(`pegawai berhasil dihapus`, result, res);
        })
        .catch((error) => response.internalServerError(error, res));
};