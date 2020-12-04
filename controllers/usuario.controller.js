const Usuario = require("../models/usuario.model");
const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  const hasta = Number(req.query.hasta) || desde + 5;

  /*
  const usuarios = await Usuario.find().skip(desde).limit(hasta);
  const total = await Usuario.count();
  */

  //igual que arriba pero se realizan en simultaneo, con desestructuracion se obtienen
  // los resultados de ambas promesas dentro del promise all
  const [usuarios, total] = await Promise.all([
    Usuario.find().skip(desde).limit(hasta),

    Usuario.count(),
  ]);

  res.json({
    ok: true,
    usuarios: usuarios,
    viendo: usuarios.length,
    jwt_uid: req.uid,
    total,
  });
};

const saveUsuario = async (req, res = response) => {
  const { email, password, nombre } = req.body;
  const existeEmail = await Usuario.findOne({ email: email });

  if (existeEmail) {
    return res.status(400).json({
      ok: false,
      mensaje: "Ese correo ya esta en uso",
    });
  }
  const usuario = new Usuario(req.body);
  try {
    //encriptado
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //generar el JWT
    const token = await generarJWT(usuario.uid);

    await usuario.save();
    res.json({
      ok: true,
      usuario: usuario,
      token,
    });
  } catch (error) {
    console.error("error al crear usuario");
    res.status(500).json({
      ok: false,
      mensaje: "Error inesperado",
    });
  }
};

const updateUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.json({
        ok: false,
        error: "No existe usuario con ese id",
      });
    }

    //actualizaciones
    const { password, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email: email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          mensaje: "Ese correo ya esta en uso",
        });
      }
    }

    if (usuarioDB.id !== req.uid) {
      return res.status(400).json({
        ok: false,
        mensaje: "No es el usuario dueño de esta cuenta",
      });
    }

    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos);
    res.json({
      ok: true,
      usuarioAnterior: usuarioActualizado,
    });
  } catch (error) {
    console.error("error al actualizar usuario");
    res.status(500).json({
      ok: false,
      mensaje: "Error inesperado",
      error,
    });
  }
};

const deleteUsuario = async (req, res) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.json({
        ok: false,
        error: "No existe usuario con ese id",
      });
    }
    const usuario = await Usuario.findByIdAndDelete(uid);
    res.json({
      ok: true,
      mensaje: "Usuario eliminado",
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Error inesperado",
      error,
    });
  }
};

module.exports = {
  getUsuarios,
  saveUsuario,
  updateUsuario,
  deleteUsuario,
};
