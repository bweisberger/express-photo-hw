const mongoose = require('mongoose');
const photoSchema = new mongoose.Schema({
  title: String,
  url: {type:String, required:true},
  userName: String
});

const Photos = mongoose.model('Photos', photoSchema);

module.exports = Photos;
