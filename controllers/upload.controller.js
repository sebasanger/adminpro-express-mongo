const Usuario = require("../models/usuario.model");
const { response, request } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require("path");
const fs = require("fs");

const fileUpload = async (req = request, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;
  //ver que sea un tipo valido de campo para subir la imagen
  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.json({
      ok: false,
      mensaje: "El tipo tiene que ser hospital, medico o usuario",
    });
  }
  //validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "No hay ningun archivo",
    });
  }

  //procesar la imagen
  const file = req.files.imagen;
  const nombreCortado = file.name.split(".");
  const extesion = nombreCortado[nombreCortado.length - 1];
  //verificar que sea una imgane mediante la extecion
  const extecionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extecionesValidas.includes(extesion)) {
    return res.json({
      ok: false,
      mensaje: "El archivo no es una imagen",
    });
  }

  //cambiar el nombre del archivo
  const nombreArchivo = `${file.name}--${uuidv4()}.${extesion}`;

  const path = `./uploads/${tipo}/${nombreArchivo}`;

  //mover la imagen
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        err,
        ok: false,
        mensaje: "Error interno",
      });
    }
    return res.json({
      ok: true,
      nombreArchivo,
      mensaje: "Arcivo cargado",
    });
  });

  //actualizar en la base de datos
  actualizarImagen(tipo, id, nombreArchivo);
};

const retornarImagen = (req = request, res = response) => {
  const { tipo, foto } = req.params;
  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImgDefault = path.join(__dirname, `../uploads/noimage.jpg`);
    res.sendFile(pathImgDefault);
  }
};

module.exports = {
  fileUpload,
  retornarImagen,
};
