const { Schema, models, model, default: mongoose } = require("mongoose");

const BrandSchema = new Schema({
  name: {type: String, required: true},
})

export const Brand = models?.Brand || model('Brand', BrandSchema);