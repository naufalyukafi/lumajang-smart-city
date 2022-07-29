const Joi = require("joi");
const response = require("../response");
const { pos_kamling } = require("../models");

exports.newPosKamling = async (req, res) => {
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
        keterangan: Joi.string().min(10).max(255).required().messages({
            "any.required": `"keterangan" tidak boleh dikosongi`,
        }),
    });

    const { error } = schema.validate(req.body);
    if (error) return response.errorParams(error.message, res);

    const nama = req.body.nama;
    const phone = req.body.phone;
    const photo = req.body.photo;
    const keterangan = req.body.keterangan;
    const alamat = req.body.alamat;

    await pos_kamling.create(
        {
            nama: nama,
            alamat: alamat,
            phone: phone,
            photo: photo,
            keterangan: keterangan,
            created_by: 1,
            updated_by: 1,
            created_date: Date.now(),
            updated_date: Date.now(),
        },
        { raw: true }
    )
        .then(async (result) => {
            response.successWithCustomMsg(`Pos Kamling berhasil dibuat!`, result, res);
        })
        .catch((error) => response.internalServerError(error, res));
};

exports.getAllPosKamling = async (req, res) => {
    await pos_kamling
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

exports.updatePosKamling = async (req, res) => {
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
        keterangan: Joi.string().min(10).max(255).required().messages({
            "any.required": `"keterangan" tidak boleh dikosongi`,
        }),
    });

    const { error } = schema.validate(req.body);
    if (error) return response.errorParams(error.message, res);

    const nama = req.body.nama;
    const phone = req.body.phone;
    const photo = req.body.photo;
    const keterangan = req.body.keterangan;
    const alamat = req.body.alamat;

    await pos_kamling
        .update({
            nama: nama,
            alamat: alamat,
            phone: phone,
            photo: photo,
            keterangan: keterangan,
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
            return response.successWithCustomMsg(`Pos Kamling berhasil diupdate!`, result, res);
        })
        .catch((error) => {
            return response.internalServerError(error, res);
        });
};

exports.deletePosKamling = async (req, res) => {
    const schema = Joi.object({
        id: Joi.number().integer().required().messages({
            "any.required": `"id" tidak boleh dikosongi`,
        }),
    });

    const { error } = schema.validate(req.params);
    if (error) return response.errorParams(error.message, res);

    const id = req.params.id;

    await pos_kamling
        .destroy({
            where: { id: id },
        })
        .then(async (result) => {
            response.successWithCustomMsg(`Pesan berhasil dihapus`, result, res);
        })
        .catch((error) => response.internalServerError(error, res));
};