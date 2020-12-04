const { model, Schema } = require("mongoose");

const MedicoSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  hospital: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "Hospital",
  },
});

MedicoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();

  return object;
});

module.exports = model("Medico", MedicoSchema);
