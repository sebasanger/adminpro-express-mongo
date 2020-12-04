const Usuario = require("../models/usuario.model");
const Hospital = require("../models/hospital.model");
const Medico = require("../models/medico.model");
const fs = require("fs");
const actualizarImagen = async (tipo, id, nombreArchivo) => {
  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        return false;
      }
      //ver si existe imagen anterior y si existe se elimina
      const pathAntiguo = `./uploads/medicos/${medico.img}`;
      borrarImagen(pathAntiguo);

      medico.img = nombreArchivo;
      await medico.save();
      return true;
      break;

    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        return false;
      }
      //ver si existe imagen anterior y si existe se elimina
      const imagenAntigua = `./uploads/hospitales/${hospital.img}`;
      borrarImagen(imagenAntigua);

      hospital.img = nombreArchivo;
      await hospital.save();
      break;

    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        return false;
      }
      //ver si existe imagen anterior y si existe se elimina
      const imagenAntiguaUsuario = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(imagenAntiguaUsuario);

      usuario.img = nombreArchivo;
      await usuario.save();
      break;

    default:
      break;
  }
};

const borrarImagen = (pathAntiguo) => {
  if (fs.existsSync(pathAntiguo)) {
    console.log("Elimine la imagen anterior");
    fs.unlinkSync(pathAntiguo);
  }
};

module.exports = {
  actualizarImagen,
};
