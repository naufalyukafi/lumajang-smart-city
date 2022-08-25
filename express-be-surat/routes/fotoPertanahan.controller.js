const Joi = require("joi");
const { foto_pertanahan } = require("../models");
const response = require("../response");
const fs = require("fs");

exports.fotoPertanahanTBaru = async (req, res) => {
    const schema = Joi.object({
        type: Joi.string().min(2).max(250).required(),
        pertanahan_id: Joi.number().integer().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return response.errorParams(error.message, res);

    //
    await foto_pertanahan
        .create({
            pertanahan_id: req.body.pertanahan_id,
            type: req.body.type,
            deskripsi: "",
            image_url: "/" + req.file.path,
            created_by: req.auth.id,
            updated_by: req.auth.id,
            created_date: Date.now(),
            updated_date: Date.now(),
        })
        .then((data) => {
            response.successWithCustomMsg(
                `Berhasil Menambahkan Foto Baru`,
                data,
                res
            );
        })
        .catch((error) => response.internalServerError(error, res));
};

exports.fotoPertanahanUpdate = async (req, res) => {
    const schema = Joi.object({
        type: Joi.string().min(2).max(250).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return response.errorParams(error.message, res);

    //
    await foto_pertanahan
        .update(
            {
                type: req.body.type,
                updated_by: req.auth.id,
                updated_date: Date.now(),
            },
            {
                where: {
                    id: req.body.id,
                },
            }
        )
        .then((data) => {
            response.successWithCustomMsg(
                `Berhasil Memperbarui data foto`,
                data,
                res
            );
        })
        .catch((error) => response.internalServerError(error, res));
};

exports.fotoPertanahanHapus = async (req, res) => {
    const schema = Joi.object({
        foto_id: Joi.number().integer().required(),
        path: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return response.errorParams(error.message, res);

    //
    await foto_pertanahan
        .destroy({ where: { id: req.body.foto_id } })
        .then((data) => {
            // Delete File
            try {
                fs.unlink(req.body.path.toString().substring(1), function () {
                    response.successWithCustomMsg(`Berhasil Menghapus Foto`, data, res);
                });
            } catch (err) {
                // handle the error
                return response.internalServerError(error, res);
            }
        })
        .catch((error) => response.internalServerError(error, res));
};