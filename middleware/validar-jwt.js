const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const validarJWT = (req = request, res = response, next) => {
  //leer el token
  const token = req.header("x-token");

  //verifica que exista el token o da una respuesta de error
  if (!token) {
    return res.status(401).json({
      ok: false,
      mensaje: "No hay token en la peticion",
    });
  }
  try {
    //verifica que el token es correcto sino pasa a lerror
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.uid = uid;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      mensaje: "Token invalido",
    });
  }
  next();
};

module.exports = {
  validarJWT,
};
