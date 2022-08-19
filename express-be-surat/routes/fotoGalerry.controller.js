const Joi = require("joi");
const { table_foto } = require("../models");
const response = require("../response");
const fs = require("fs");

exports.fotoGalleryTBaru = async (req, res) => {
  const schema = Joi.object({
    caption: Joi.string().min(2).max(250).required(),
    blog_id: Joi.number().integer().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return response.errorParams(error.message, res);

  //
  await table_foto
    .create({
      blog_id: req.body.blog_id,
      caption: req.body.caption,
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

exports.fotoGalleryUpdate = async (req, res) => {
  const schema = Joi.object({
    caption: Joi.string().min(2).max(250).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return response.errorParams(error.message, res);

  //
  await table_foto
    .update(
      {
        caption: req.body.caption,
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

exports.fotoGalleryHapus = async (req, res) => {
  const schema = Joi.object({
    foto_id: Joi.number().integer().required(),
    path: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return response.errorParams(error.message, res);

  //
  await table_foto
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