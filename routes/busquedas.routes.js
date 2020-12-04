/*
    ruta: api/todo/:filtro
*/
const { Router } = require("express");
const {
  getTodo,
  getDocumentosColeccion,
} = require("../controllers/filtro.controller");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.get("/:busqueda", validarJWT, getTodo);

router.get("/coleccion/:tabla/:busqueda", validarJWT, getDocumentosColeccion);

module.exports = router;
