const express = require("express");
const { dbconecection } = require("./database/config");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

//conexion de db
dbconecection();

// configuracion de cors
app.use(cors());

//lectura del body
app.use(express.json());

//directorio publico
app.use(express.static("public"));

mongoose.set("useFindAndModify", false);

//rutas
app.use("/api/usuarios", require("./routes/usuarios.routes"));
app.use("/api/login", require("./routes/auth.routes"));
app.use("/api/hospitales", require("./routes/hospitales.routes"));
app.use("/api/medicos", require("./routes/medicos.routes"));
app.use("/api/todo", require("./routes/busquedas.routes"));
app.use("/api/upload", require("./routes/uploads.routes"));

const port = process.env.PORT || 4000;
const www = process.env.WWW || "./";
app.use(express.static(www));
console.log(`serving ${www}`);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
