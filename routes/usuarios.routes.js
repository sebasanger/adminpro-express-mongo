/*
    Ruta: '/api/usuarios
*/

const { Router } = require("express");
const { validarCampos } = require("../middleware/validar-campos");
const {
  getUsuarios,
  saveUsuario,
  updateUsuario,
  deleteUsuario,
} = require("../controllers/usuario.controller");

const { check } = require("express-validator");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.get("/", validarJWT, getUsuarios);

router.post(
  "/",
  [
    check("email", "Debe ser un email valido").isEmail(),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("password", "El password es obligatorio").notEmpty(),
    check("email", "El email es obligatorio").notEmpty(),
    validarCampos,
  ],
  saveUsuario
);

router.put(
  "/:id",
  [
    check("email", "Debe ser un email valido").isEmail(),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("email", "El email es obligatorio").notEmpty(),
    validarCampos,
    validarJWT,
  ],
  updateUsuario
);

router.delete("/:id", deleteUsuario);

module.exports = router;
