/*
    ruta: api/upload
*/
const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const {
  fileUpload,
  retornarImagen,
} = require("../controllers/upload.controller");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();
router.use(expressFileUpload());

router.put("/:tipo/:id", validarJWT, fileUpload);

router.get("/:tipo/:foto", retornarImagen);

module.exports = router;
