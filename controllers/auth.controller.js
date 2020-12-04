const Usuario = require("../models/usuario.model");
const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });

    //verificar si existe el usuario
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        mensaje: "Usuario o contraseña incorrecto",
      });
    }

    //verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        mensaje: "contraseña incorrecto",
      });
    }

    //realizar un JWT
    const token = await generarJWT(usuarioDB.id);

    return res.status(200).json({
      ok: true,
      mensaje: "session iniciada",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al iniciar session",
    });
  }
};

const renewToken = async (req = request, res = response) => {
  const uid = req.uid;
  const token = await generarJWT(uid);

  return res.status(200).json({
    ok: true,
    mensaje: "Renovando token",
    uid,
    token,
  });
};

module.exports = {
  login,
  renewToken,
};
