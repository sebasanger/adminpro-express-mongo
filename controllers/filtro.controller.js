const Usuario = require("../models/usuario.model");
const Hospital = require("../models/hospital.model");
const Medico = require("../models/medico.model");
const { response, request } = require("express");

const getTodo = async (req = request, res = response) => {
  const filtro = req.params.busqueda;
  const regex = new RegExp(filtro, "i");

  const [usuarios, medicos, hospital] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  return res.json({
    filtro,
    ok: true,
    usuarios: usuarios,
    hospital,
    medicos,
  });
};

const getDocumentosColeccion = async (req = request, res = response) => {
  const tabla = req.params.tabla;
  const filtro = req.params.busqueda;
  const regex = new RegExp(filtro, "i");
  let resultado;
  switch (tabla) {
    case "medicos":
      resultado = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre")
        .populate("hospital", "nombre");
      break;

    case "hospitales":
      resultado = await Hospital.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );
      break;

    case "usuarios":
      resultado = await Usuario.find({ nombre: regex });
      break;

    default:
      return res.json({
        resultado,
        ok: true,
        mensaje: "Las tablas disponibles son medicos, usuarios u hospitales",
      });
      break;
  }

  return res.json({
    filtro,
    ok: true,
    resultado,
  });
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
