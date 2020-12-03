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

mongoose.set("useFindAndModify", false);

//rutas
app.use("/api/usuarios", require("./routes/usuarios.routes"));
app.use("/api/login", require("./routes/auth.routes"));

const port = process.env.PORT || 4000;
const www = process.env.WWW || "./";
app.use(express.static(www));
console.log(`serving ${www}`);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
