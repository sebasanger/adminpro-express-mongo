/*
    Ruta: '/api/hospitales
*/

const { Router } = require("express");
const { validarCampos } = require("../middleware/validar-campos");
const {
  getHospitales,
  saveHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospital.controller");

const { check } = require("express-validator");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.get("/", validarJWT, getHospitales);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
    validarJWT,
  ],
  saveHospital
);

router.put(
  "/:id",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
    validarJWT,
  ],
  updateHospital
);

router.delete("/:id", deleteHospital);

module.exports = router;
