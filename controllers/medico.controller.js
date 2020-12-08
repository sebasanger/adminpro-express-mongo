const Medico = require("../models/medico.model");
const Hospital = require("../models/hospital.model");
const { response, request } = require("express");

const getMedicos = async (req, res) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre")
    .populate("hospital", "nombre");
  res.json({
    ok: true,
    medicos,
    jwt_uid: req.uid,
  });
};

const saveMedico = async (req, res = response) => {
  //ver si existe el hospital
  const { hospital, nombre } = req.body;
  const uid = req.uid;

  try {
    await Hospital.findById({ _id: hospital });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      mensaje: "No existe el hospital",
    });
  }

  const medico = new Medico({ ...req.body, usuario: uid });
  try {
    await medico.save();
    return res.json({
      ok: true,
      medico: medico,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Error inesperado",
    });
  }
};

const updateMedico = async (req, res = response) => {
  const id = req.params.id;
  try {
    const medicoDB = await Medico.findById(id);

    if (!medicoDB) {
      return res.json({
        ok: false,
        error: "No existe medico con ese id",
      });
    }

    //verificar si es que quiere cambiar de hospital
    const { hospital, nombre } = req.body;
    if (hospital != medicoDB.hospital) {
      //verificar qeu exista el hospital al qeu se quiere cambiar
      const existeHospital = await Hospital.findById({ _id: hospital });
      if (!existeHospital) {
        return res.status(400).json({
          ok: false,
          mensaje: "No existe el hospital",
        });
      }
    }

    const medicoActualizado = await Medico.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      ok: true,
      id,
      medicoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Error inesperado",
      error,
    });
  }
};

const deleteMedico = async (req, res) => {
  const id = req.params.id;

  try {
    const medicoDB = await Medico.findById(id);

    if (!medicoDB) {
      return res.json({
        ok: false,
        error: "No existe medico con ese id",
      });
    }
    const medico = await Medico.findByIdAndDelete(id);
    res.json({
      ok: true,
      mensaje: "medico eliminado",
      medico,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Error inesperado",
      error,
    });
  }
};

const getMedicoById = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const medicoDB = await Medico.findById(id);

    if (!medicoDB) {
      return res.json({
        ok: false,
        error: "No existe medico con ese id",
      });
    }
    const medico = await Medico.findById(id)
      .populate("usuario", "nombre img")
      .populate("hospital", "nombre img");
    res.json({
      ok: true,
      medico,
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
  getMedicos,
  saveMedico,
  updateMedico,
  deleteMedico,
  getMedicoById,
};
