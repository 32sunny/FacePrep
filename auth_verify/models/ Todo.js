const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  link: String, 
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
