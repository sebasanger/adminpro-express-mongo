/*
    Ruta: '/api/login
*/
const { Router } = require("express");
const router = Router();
const { login, renewToken } = require("../controllers/auth.controller");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");

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

router.post("/renew", validarJWT, renewToken);

module.exports = router;
