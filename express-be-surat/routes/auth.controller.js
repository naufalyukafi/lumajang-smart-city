const { user, akses_token } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const sequelizeConf = require("../config/database");
const ip = require("ip");
const Joi = require("joi");
const moment = require("moment-timezone");
moment.locale("id");
moment.tz.setDefault("Asia/Jakarta");
const response = require("../response");

const createUser = async (req, res) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(req.body.password, salt);

  const schema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    email: Joi.string().min(3).max(200).required(),
    password: Joi.string().min(6).max(200).required(),
    phone: Joi.string().allow(null, ""),
    role: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return response.errorParams(error.message, res);

  await user
    .findOne({
      where: {
        email: req.body.email,
      },
      raw: true,
    })
    .then(async (dat) => {
      // check not same email
      console.log(dat);
      if (dat) {
        return response.successWithErrorMsg(
          "Email sudah digunakan pada pengguna lain",
          res
        );
      } else {
        // Email tidak sama
        await user
          .create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            status: "Belum Verifikasi Akun",
            password: hash,
            role: req.body.role,
            created_date: Date.now(),
            updated_date: Date.now(),
          })
          .then(function (result) {
            return response.successWithCustomMsg(
              "Registrasi Berhasil",
              result.name,
              res
            );
          })
          .catch(function (error) {
            response.internalServerError(error, res);
          });
      }
    })
    .catch(function (error) {
      return response.internalServerError(error, res);
    });
};

const verifikasiUser = async (req, res) => {
  const status = req.body.status
  await user.update(
    {
      status
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(async (result) => {
    return response.successWithCustomMsg(`Akun berhasil di${status === "verifikasi" ? "verifikasi" : "tolak"}!`, result, res);
  })
    .catch((error) => {
      return response.internalServerError(error, res);
    });
}

const loginUser = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required(),
    password: Joi.string().min(3).max(200).required(),
  });
  const { error } = schema.validate(req.body);
  if (error)
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  const qslct =
    "SELECT * FROM users LEFT JOIN user_roles ON user_roles.role_id=users.role WHERE users.email=:email";
  //#region find user
  await sequelizeConf
    .query(qslct, {
      replacements: {
        email: req.body.email,
      },
      plain: false,
      raw: true,
      type: Sequelize.QueryTypes.SELECT,
    })
    .then(async (resultt) => {
      const data = resultt[0];

      if (data) {
        //VALID Password
        const cekpwd = await bcrypt.compare(req.body.password, data.password);
        if (!cekpwd) {
          res.status(200).json({
            success: false,
            message: "Password yang anda masukkan salah",
          });
        }
        const token = jwt.sign(
          {
            id: data.id,
            name: data.name,
            email: data.email,
            status: data.status,
            picture: data.picture,
            phone: data.phone,
            authorize: data.role_name,
          },
          "lumajang",
          {
            expiresIn: "5h",
          }
        );

        //update log
        akses_token
          .create({
            id_user: data.id,
            access_token: token,
            ip_address: ip.address(),
            last_time: Date.now(),
            created_date: Date.now(),
            updated_date: Date.now(),
          })
          .catch((error) => {
            console.log(error);
            response.internalServerError(error, res);
          });

        return response.successWithCustomMsg(
          `Halo ${data.name}, Selamat Datang`,
          {
            payload: token,
            statusAkun: data.status,
            authorize: data.role_name,
          },
          res
        );
      } else {
        return response.successWithErrorMsg(
          "Email yang anda masukkan salah / tidak ditemukan.",
          res
        );
      }
    })
    .catch((error) => response.internalServerError(error, res));
  //#endregion
};

const readUser = (req, res) => {
  user
    .findOne({
      where: {
        id: req.auth.id,
      },
      attributes: {
        include: [],
        exclude: ["password", "role"],
      },
    })
    .then(function (result) {
      if (result) {
        response.success(result, res);
      } else {
        response.successWithErrorMsg("Data tidak ditemukan", res);
      }
    })
    .catch((error) => response.internalServerError(error, res));
};

const readAllUser = (req, res) => {
  user.findAll({
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

const updateUser = (req, res) => {
  model.User.update(
    {
      name: req.body.name,
      label: req.body.label,
      picture: req.body.picture,
      email: req.body.email,
      phone: req.body.phone,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({ error: error });
    });
};

const deleteUser = (req, res) => {
  let decodedId = req.decoded.id;

  if (Number(decodedId) === Number(req.params.id)) {
    model.User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(function (result) {
        res.json(result);
      })
      .catch(function (error) {
        res.json({ error: error });
      });
  } else {
    res.json({
      message: "Ini bukan data Anda",
    });
  }
};

const updatepassworddata = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "any.required": `"tag id" tidak boleh dikosongi`,
      "number.base": `"tag id" Tidak valid pastikan alamat url sesuai.`,
    }),
    oldpass: Joi.string().min(4).max(150).required().messages({
      "any.required": `"Password" tidak boleh dikosongi`,
    }),
    newpass: Joi.string().min(4).max(150).required().messages({
      "any.required": `"Password" tidak boleh dikosongi`,
    }),
    repass: Joi.string().min(4).max(150).required().messages({
      "any.required": `"Password" tidak boleh dikosongi`,
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return response.errorParams(error.message, res);

  // #1 Find User
  await user
    .findOne({
      where: { id: req.body.id },
      raw: true,
    })
    .then(async (data) => {
      if (data) {
        //VALID Password
        const cekpwd = await bcrypt.compare(req.body.oldpass, data.password);
        if (!cekpwd) {
          res.status(200).json({
            success: false,
            message: "Password Lama yang anda masukkan salah",
          });
        } else if (cekpwd && req.body.newpass === req.body.oldpass) {
          response.successWithErrorMsg(
            "Tidak ada perubahan password, Pastikan password baru bukan dari password lama.",
            res
          );
        } else {
          //Lulus
          const salt = await bcrypt.genSalt(10);
          const pwd = await bcrypt.hash(req.body.newpass, salt);
          await user
            .update(
              { password: pwd, updated_by: req.auth.id },
              { where: { id: data.id } }
            )
            .then(() => {
              response.successWithCustomMsg(
                `Password Berhasil diperbarui.`,
                "success",
                res
              );
            })
            .catch((error) => response.internalServerError(error, res));
        }
      } else {
        response.successWithErrorMsg("Id User Tidak di temukan", res);
      }
    })
    .catch((error) => response.internalServerError(error, res));
};

const updateuserinformationdata = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "any.required": `"tag id" tidak boleh dikosongi`,
      "number.base": `"tag id" Tidak valid pastikan alamat url sesuai.`,
    }),
    name: Joi.string().min(4).max(100).required().messages({
      "any.required": `"Nama" tidak boleh dikosongi`,
    }),
    about: Joi.string().min(4).max(256).required().messages({
      "any.required": `"about me" tidak boleh dikosongi`,
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return response.errorParams(error.message, res);

  await user
    .update(
      {
        name: req.body.name,
        about: req.body.about,
        updated_by: req.auth.id,
        updated_date: Date.now(),
      },
      {
        where: { id: req.body.id },
        raw: true,
      }
    )
    .then(() => {
      response.successWithCustomMsg(
        `Informasi data Berhasil diperbarui.`,
        "success",
        res
      );
    })
    .catch((error) => response.internalServerError(error, res));
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  readUser,
  updatepassworddata,
  updateuserinformationdata,
  verifikasiUser,
  readAllUser
};