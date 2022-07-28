const Joi = require("joi");
const response = require("../response");
const { saran_aduan } = require("../models");

exports.newMessageFromUser = async (req, res) => {
    const schema = Joi.object({
        nama: Joi.string().min(3).max(25).required().messages({
            "any.required": `"nama" tidak boleh dikosongi`,
        }),
        email: Joi.string().min(3).max(25).required().messages({
            "any.required": `"email" tidak boleh dikosongi`,
        }),
        phone: Joi.string().min(3).max(14).required().messages({
            "any.required": `"phone" tidak boleh dikosongi`,
        }),
        photo: Joi.string().min(3).max(255).required().messages({
            "any.required": `"photo" tidak boleh dikosongi`,
        }),
        identitas: Joi.string().min(5).max(255).required().messages({
            "any.required": `"identitas" tidak boleh dikosongi`,
        }),
        pekerjaan: Joi.string().min(10).max(255).required().messages({
            "any.required": `"photo" tidak boleh dikosongi`,
        }),
        status_kependudukan: Joi.string().min(3).max(250).required().messages({
            "any.required": `"status kependudukan" tidak boleh dikosongi`,
        }),
        alamat: Joi.string().min(10).max(255).required().messages({
            "any.required": `"alamat" tidak boleh dikosongi`,
        }),
        judul: Joi.string().min(10).max(255).required().messages({
            "any.required": `"judul" tidak boleh dikosongi`,
        }),
        message: Joi.string().min(3).max(250).required().messages({
            "any.required": `"message" tidak boleh dikosongi`,
        }),
        status: Joi.string().min(3).max(255).required().messages({
            "any.required": `"status" tidak boleh dikosongi`,
        }),
    });

    const { error } = schema.validate(req.body);
    if (error) return response.errorParams(error.message, res);

    const nama = req.body.nama;
    const email = req.body.email;
    const phone = req.body.phone;
    const photo = req.body.photo;
    const identitas = req.body.identitas;
    const pekerjaan = req.body.pekerjaan;
    const message = req.body.message;
    const status_kependudukan = req.body.status_kependudukan;
    const alamat = req.body.alamat;
    const judul = req.body.judul;
    const status = req.body.status;

    await saran_aduan.create(
            {
                nama: nama,
                email: email,
                phone: phone,
                photo: photo,
                identitas: identitas,
                pekerjaan: pekerjaan,
                status_kependudukan: status_kependudukan,
                alamat: alamat,
                judul: judul,
                status: status,
                message: message,
                created_date: Date.now(),
                updated_date: Date.now(),
            },
            { raw: true }
        )
        .then(async (result) => {
            response.successWithCustomMsg(`Pesan Anda Sukses Terkirim!`, result, res);
        })
        .catch((error) => response.internalServerError(error, res));
};

exports.getAllMessageUser = async (req, res) => {
    await saran_aduan
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

exports.deleteMessageUser = async (req, res) => {
    const schema = Joi.object({
        id: Joi.number().integer().required().messages({
            "any.required": `"id" tidak boleh dikosongi`,
        }),
    });

    const { error } = schema.validate(req.params);
    if (error) return response.errorParams(error.message, res);

    const id = req.params.id;

    await saran_aduan
        .destroy({
            where: { id: id },
        })
        .then(async (result) => {
            response.successWithCustomMsg(`Pesan berhasil dihapus`, result, res);
        })
        .catch((error) => response.internalServerError(error, res));
};