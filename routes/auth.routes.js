/*
    Ruta: '/api/login
*/
const { Router } = require("express");
const router = Router();
const { login } = require("../controllers/auth.controller");
const { validarCampos } = require("../middleware/validar-campos");

const { check } = require("express-validator");

router.post(
  "/",
  [
    check("email", "El email es obligatiorio").notEmpty(),
    check("password", "El password es obligatiorio").notEmpty(),
    check("email", "El email tiene que ser valido").isEmail(),
    validarCampos,
  ],
  login
);

module.exports = router;
