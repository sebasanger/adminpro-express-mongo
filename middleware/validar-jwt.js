const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model");

const validarJWT = (req = request, res = response, next) => {
  //leer el token
  const token = req.header("x-token");

  //verifica que exista el token o da una respuesta de error
  if (!token) {
    return res.status(401).json({
      ok: false,
      mensaje: "No hay token en la peticion",
    });
  }
  try {
    //verifica que el token es correcto sino pasa a lerror
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.uid = uid;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      mensaje: "Token invalido",
    });
  }
  next();
};

const validarAdminRole = async (req = request, res = response, next) => {
  const uid = req.uid;
  try {
    //verifica que exista el usuario
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        mensaje: "El usuario no existe",
      });
    }
    //verifica que el usuario tenga el rol especificado
    if (usuarioDB.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        mensaje: "El usuario no tiene privilegios para esta peticion",
      });
    }
    //si no hay errores pasa
    next();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "error",
    });
  }
};

module.exports = {
  validarJWT,
  validarAdminRole,
};
