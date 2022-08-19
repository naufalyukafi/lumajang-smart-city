const { blog, table_foto, Sequelize, sequelize } = require("../models");
const Joi = require("joi");
const response = require("../response");
const sequelizeConf = require("../config/database");

exports.getAllBlogs = async (req, res) => {
    await blog
        .findAll({
            order: [["created_date", "DESC"]],
            raw: true,
        })
        .then((result) => {
            return response.success(result, res);
        })
        .catch((error) => {
            return response.internalServerError(error, res);
        });
};

exports.getAllUserBlogs = async (req, res) => {
    await blog
        .findAll({
            order: [["created_date", "DESC"]],
            raw: true,
            where: {
                status: 1
            }
        })
        .then((result) => {
            return response.success(result, res);
        })
        .catch((error) => {
            return response.internalServerError(error, res);
        });
};

exports.getHighlight = async (req, res) => {
    await blog
        .findAll({
            limit: 3,
            order: [["created_date", "DESC"]],
            raw: true,
            where: {
                status: 1
            }
        })
        .then((result) => {
            return response.success(result, res);
        })
        .catch((error) => {
            return response.internalServerError(error, res);
        });
};

exports.detailBlog = async (req, res) => {
    const schema = Joi.object({
        label_slug: Joi.string().min(3).max(50).required(),
    });

    const { error } = schema.validate(req.params);
    if (error) return response.errorParams(error.message, res);

    const label_slug = req.params.label_slug;
    const sql = `SELECT *, blogs.id AS idBlog FROM blogs LEFT JOIN users ON blogs.updated_by=users.id WHERE blogs.label_slug=:label_slug`;
    await sequelizeConf
        .query(sql, {
            replacements: { label_slug: label_slug },
            plain: false,
            raw: true,
            type: Sequelize.QueryTypes.SELECT,
        })
        .then(async (result) => {
            if(result) {
                await table_foto
                .findAll({
                    where: { blog_id: result[0].idBlog },
                })
                .then((data) => {
                    return response.success({ ...result[0], listgallery: data }, res);
                })
                .catch((error) => response.internalServerError(error, res));
            } else {
                return response.successWithErrorMsg("Data tidak ditemukan", res);
            }
        })
        .catch((error) => {
            return response.internalServerError(error, res);
        });
};

exports.createNewBlog = async (req, res) => {
    const schema = Joi.object({
        status: Joi.boolean().required().messages({
            "any.required": `"status" tidak boleh dikosongi`,
        }),
        content: Joi.required().messages({
            "any.required": `"title" tidak boleh dikosongi`,
        })
    });

    const { error } = schema.validate(req.body);
    if (error) return response.errorParams(error.message, res);

    const status = req.body.status;
    const content = req.body.content;
    const newslug = content.toString().toLowerCase().replace(/\s+/g, "-");

    const cont = await blog.findOne({
        where: {
            label_slug: newslug,
        },
    })
        .catch((error) => response.internalServerError(error, res));

    if (!cont) {
        await blog.create(
            {
                status: status,
                label_slug: newslug,
                title: content,
                content: `<p>Tulis disini...</p>`,
                link_banner: "",
                view: 0,
                created_date: Date.now(),
                updated_date: Date.now(),
            },
            { raw: true }
        )
            .then(async (result) => {
                response.successWithCustomMsg(
                    `Halaman ${content} berhasil dibuat`,
                    "success",
                    res
                );
            })
            .catch((error) => response.internalServerError(error, res));
    } else {
        response.successWithErrorMsg(
            "Nama Halaman ada yang sama, gunakan nama halaman yang berbeda.",
            res
        );
    }
};

exports.updateBlog = async (req, res) => {
    const status = req.body.status;
    const title = req.body.title;
    const content = req.body.content;
    const link_banner = req.body.link_banner;

    await blog
        .update(
            {
                status: status,
                label_slug: title.toString().toLowerCase().replace(/\s+/g, "-"),
                title: title,
                content: content,
                link_banner: link_banner,
                created_date: Date.now(),
                updated_date: Date.now(),
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
        .then(function (result) {
            return response.successWithCustomMsg(
                "Konten Berhasil diperbaruhi",
                result,
                res
            );
        })
        .catch(function (error) {
            return response.internalServerError(error, res);
        });
};

exports.updateBlogContent = async (req, res) => {
    const schema = Joi.object({
        content: Joi.required().messages({
            "any.required": `"content" tidak boleh dikosongi`,
        }),
    });
    const { error } = schema.validate(req.body);
    if (error) return response.errorParams(error.message, res);

    const id = req.params.id;
    const content = req.body.content;

    await blog.update(
        {
            content: content,
            updated_by: req.auth.id,
            updated_date: Date.now(),
        },
        {
            where: {
                id: id,
            },
        }
    ).then(async function (result) {
        response.successWithCustomMsg(
            "Konten Berhasil diperbaruhi",
            result,
            res
        );
    }).catch((error) => response.internalServerError(error, res));
};

exports.updateBlogContentTitle = async (req, res) => {
    const schema = Joi.object({
        content: Joi.required().messages({
            "any.required": `"content indonesia" tidak boleh dikosongi`,
        })
    });
    const { error } = schema.validate(req.body);
    if (error) return response.errorParams(error.message, res);

    const id = req.params.id;
    const content = req.body.content;
    const newslug = content.toString().toLowerCase().replace(/\s+/g, "-");

    const cont = await blog
        .findOne({
            where: {
                label_slug: newslug,
            },
        })
        .catch((error) => response.internalServerError(error, res));

    if (!cont) {
        await blog
            .update(
                {
                    title: content,
                    label_slug: newslug,
                    updated_by: req.auth.id,
                    updated_date: Date.now(),
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
            .then(function (result) {
                return response.successWithCustomMsg(
                    "Konten Berhasil diperbaruhi",
                    result,
                    res
                );
            })
            .catch((error) => response.internalServerError(error, res));
    } else {
        response.successWithErrorMsg("Nama Halaman tidak boleh sama", res);
    }
};

exports.deleteBlogById = async (req, res) => {
    const schema = Joi.object({
        id: Joi.number().integer().required().messages({
            "any.required": `"id" tidak boleh dikosongi`,
        }),
    });
    const { error } = schema.validate(req.params);
    if (error) return response.errorParams(error.message, res);

    await blog
        .destroy({
            where: {
                id: req.params.id,
            },
        })
        .then(function (result) {
            return response.successWithCustomMsg(
                "Halaman berhasil dihapus",
                result,
                res
            );
        })
        .catch(function (error) {
            return response.internalServerError(error, res);
        });
};