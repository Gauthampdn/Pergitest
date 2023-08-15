const mongoose = require("mongoose")

const Schema = mongoose.Schema

const itemSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  context: {
    type: Schema.Types.Mixed, // 'Mixed' because context can be either a String or an Array of Strings
    required: true
  }
});

// Schema for the main object
const templateSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false // change to 'true' if it is a required field
  },
  icon: {
    type: String,
    required: false // change to 'true' if it is a required field
  },
  template: {
    type: [itemSchema],
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Create the model based on the schema

module.exports = mongoose.model('Template', templateSchema);