const Joi = require("joi");
const response = require("../response");
const { penduduk } = require("../models");

exports.newPenduduk = async (req, res) => {
    const schema = Joi.object({
        nik: Joi.string().min(8).max(250).required().messages({
            "any.required": `"nik" tidak boleh dikosongi`,
        }),
        nama: Joi.string().min(3).max(250).required().messages({
            "any.required": `"nama" tidak boleh dikosongi`,
        }),
        tanggal_lahir: Joi.string().min(5).max(250).required().messages({
            "any.required": `"tanggal_lahir" tidak boleh dikosongi`,
        }),
        alamat: Joi.string().min(3).max(250).required().messages({
            "any.required": `"alamat" tidak boleh dikosongi`,
        }),
        phone: Joi.string().min(3).max(14).required().messages({
            "any.required": `"phone" tidak boleh dikosongi`,
        }),
        photo: Joi.string().min(3).max(255).required().messages({
            "any.required": `"photo" tidak boleh dikosongi`,
        }),
        pendidikan: Joi.string().min(3).max(255).required().messages({
            "any.required": `"pendidikan" tidak boleh dikosongi`,
        }),
        pekerjaan: Joi.string().min(3).max(255).required().messages({
            "any.required": `"pekerjaan" tidak boleh dikosongi`,
        }),
        jenis_kelamin: Joi.string().min(3).max(255).required().messages({
            "any.required": `"jenis_kelamin" tidak boleh dikosongi`,
        }),
        RT: Joi.string().min(2).max(255).required().messages({
            "any.required": `"RT" tidak boleh dikosongi`,
        }),
        RW: Joi.string().min(2).max(255).required().messages({
            "any.required": `"RW" tidak boleh dikosongi`,
        }),
    });

    const { error } = schema.validate(req.body);
    if (error) return response.errorParams(error.message, res);

    const nik = req.body.nik;
    const nama = req.body.nama;
    const alamat = req.body.alamat;
    const tanggal_lahir = req.body.tanggal_lahir;
    const jenis_kelamin = req.body.jenis_kelamin;
    const phone = req.body.phone;
    const photo = req.body.photo;
    const pendidikan = req.body.pendidikan;
    const pekerjaan = req.body.pekerjaan;
    const RT = req.body.RT;
    const RW = req.body.RW;

    await penduduk.create(
        {
            nik: nik,
            nama: nama,
            jenis_kelamin: jenis_kelamin,
            alamat: alamat,
            tanggal_lahir: tanggal_lahir,
            phone: phone,
            photo: photo,
            pendidikan: pendidikan,
            pekerjaan: pekerjaan,
            RT: RT,
            RW: RW,
            created_by: 1,
            updated_by: 1,
            created_date: Date.now(),
            updated_date: Date.now(),
        },
        { raw: true }
    )
        .then(async (result) => {
            response.successWithCustomMsg(`Penduduk berhasil dibuat!`, result, res);
        })
        .catch((error) => response.internalServerError(error, res));
};

exports.getAllPenduduk = async (req, res) => {
    await penduduk.findAll({
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

exports.updatePenduduk = async (req, res) => {
    const schema = Joi.object({
        nama: Joi.string().min(3).max(250).required().messages({
            "any.required": `"nama" tidak boleh dikosongi`,
        }),
        alamat: Joi.string().min(3).max(250).required().messages({
            "any.required": `"alamat" tidak boleh dikosongi`,
        }),
        phone: Joi.string().min(3).max(14).required().messages({
            "any.required": `"phone" tidak boleh dikosongi`,
        }),
        photo: Joi.string().min(3).max(255).required().messages({
            "any.required": `"photo" tidak boleh dikosongi`,
        }),
        pendidikan: Joi.string().min(3).max(255).required().messages({
            "any.required": `"pendidikan" tidak boleh dikosongi`,
        }),
        pekerjaan: Joi.string().min(3).max(255).required().messages({
            "any.required": `"pekerjaan" tidak boleh dikosongi`,
        }),
        jenis_kelamin: Joi.string().min(3).max(255).required().messages({
            "any.required": `"jenis_kelamin" tidak boleh dikosongi`,
        }),
        RT: Joi.string().min(2).max(255).required().messages({
            "any.required": `"RT" tidak boleh dikosongi`,
        }),
        RW: Joi.string().min(2).max(255).required().messages({
            "any.required": `"RW" tidak boleh dikosongi`,
        }),
    });

    const { error } = schema.validate(req.body);
    if (error) return response.errorParams(error.message, res);

    const nama = req.body.nama;
    const alamat = req.body.alamat;
    const tanggal_lahir = req.body.tanggal_lahir;
    const phone = req.body.phone;
    const photo = req.body.photo;
    const pendidikan = req.body.pendidikan;
    const pekerjaan = req.body.pekerjaan;
    const RT = req.body.RT;
    const RW = req.body.RW;

    await penduduk.update({
            nama: nama,
            alamat: alamat,
            tanggal_lahir: tanggal_lahir,
            phone: phone,
            photo: photo,
            pendidikan: pendidikan,
            pekerjaan: pekerjaan,
            RT: RT,
            RW: RW,
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
            return response.successWithCustomMsg(`Penduduk berhasil diupdate!`, result, res);
        })
        .catch((error) => {
            return response.internalServerError(error, res);
        });
};

exports.deletePenduduk = async (req, res) => {
    const schema = Joi.object({
        nik: Joi.number().integer().required().messages({
            "any.required": `"nik" tidak boleh dikosongi`,
        }),
    });

    const { error } = schema.validate(req.params);
    if (error) return response.errorParams(error.message, res);

    const nik = req.params.nik;

    await penduduk.destroy({
            where: { nik: nik },
        })
        .then(async (result) => {
            response.successWithCustomMsg(`Penduduk berhasil dihapus`, result, res);
        })
        .catch((error) => response.internalServerError(error, res));
};