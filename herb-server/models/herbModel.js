const mongoose = require('mongoose');

const herbSchema = new mongoose.Schema({
  name_zh: {
    type: String,
    required: true,
  },
  name_en: String,
  slug: String,
  name_lat: {
    type: String,
    required: true,
    unique: true,
  },
  nature_raw: String,
  nature_tag: String,
  taste_raw: [String],
  taste_tag: [String],
  meridians: [String],
  function_group: String,
  origin_class: String,
  source: String,
  part_used: String,
  functions: String,
  indications: String,
  caution: String,
});

const Herb = mongoose.model('Herb', herbSchema);
module.exports = Herb;
