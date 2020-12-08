/*
    Ruta: '/api/medicos
*/

const { Router } = require("express");
const { validarCampos } = require("../middleware/validar-campos");
const {
  getMedicos,
  saveMedico,
  updateMedico,
  deleteMedico,
  getMedicoById,
} = require("../controllers/medico.controller");

const { check } = require("express-validator");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.get("/", validarJWT, getMedicos);

router.get("/:id", validarJWT, getMedicoById);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("hospital", "El hospital es obligatorio").notEmpty(),
    check("hospital", "El hospital es obligatorio").isMongoId(),
    validarCampos,
    validarJWT,
  ],
  saveMedico
);

router.put(
  "/:id",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
    validarJWT,
  ],
  updateMedico
);

router.delete("/:id", validarJWT, deleteMedico);

module.exports = router;
