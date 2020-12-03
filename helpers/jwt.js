const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.jwt_secret_key,
      { expiresIn: "12h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo ejecutar el JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
