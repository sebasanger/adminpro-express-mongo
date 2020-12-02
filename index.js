const express = require("express");
const { dbconecection } = require("./database/config");
const cors = require("cors");
const app = express();

//conexion de db
dbconecection();

// configuracion de cors
app.use(cors());

const port = process.env.PORT || 4000;
const www = process.env.WWW || "./";
app.use(express.static(www));
console.log(`serving ${www}`);
app.get("/", (req, res) => {
  res.status(408).json({
    ok: true,
    message: "OKEY",
  });
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
