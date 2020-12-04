const Hospital = require("../models/hospital.model");
const { response } = require("express");

const getHospitales = async (req, res) => {
  const hospitales = await Hospital.find().populate(
    "usuario",
    "nombre email img"
  );
  res.json({
    ok: true,
    hospitales,
    jwt_uid: req.uid,
  });
};

const saveHospital = async (req, res = response) => {
  //verificar si ya existe un hospital con ese nombre
  const { nombre } = req.body;
  const uid = req.uid;
  const existeHospital = await Hospital.findOne({ nombre });
  if (existeHospital) {
    return res.status(400).json({
      ok: false,
      mensaje: "Ese hospital ya esta creado",
    });
  }
  const hospital = new Hospital({ ...req.body, usuario: uid });
  try {
    await hospital.save();
    res.json({
      ok: true,
      hospital,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Error inesperado",
    });
  }
};

const updateHospital = async (req, res = response) => {
  const id = req.params.id;
  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return res.json({
        ok: false,
        error: "No existe hospital con ese id",
      });
    }

    //actualizaciones
    const { usuario, nombre } = req.body;

    //verificar si existe un hospital con ese nombre minetras no sea el mismo que ya esta
    if (hospitalDB.nombre !== nombre) {
      const existeHospital = await Hospital.findOne({ nombre });
      if (existeHospital) {
        return res.status(400).json({
          ok: false,
          mensaje: "Ese nombre ya esta en uso",
        });
      }
    }

    const hospitalActualizado = await Hospital.findByIdAndUpdate(id, req.body);
    res.json({
      ok: true,
      id,
      hospitalActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Error inesperado",
      error,
    });
  }
};

const deleteHospital = async (req, res) => {
  const id = req.params.id;

  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return res.json({
        ok: false,
        error: "No existe hospital con ese id",
      });
    }
    const hospital = await Hospital.findByIdAndDelete(id);
    res.json({
      ok: true,
      mensaje: "Hospital eliminado",
      hospital,
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
  getHospitales,
  saveHospital,
  updateHospital,
  deleteHospital,
};
