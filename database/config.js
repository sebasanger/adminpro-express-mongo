const mongoose = require("mongoose");
require("dotenv").config();
const dbconecection = async () => {
  try {
    await mongoose.connect(process.env.db_cnn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DB conectada");
  } catch (error) {
    console.error(error);
    throw new error("Error al cargar la db");
  }
};

module.exports = {
  dbconecection,
};
