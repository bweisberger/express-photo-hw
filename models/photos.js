const mongoose = require('mongoose');
const photoSchema = new mongoose.Schema({
  title: String,
  url: {type:String, required:true},
  user: {type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}

});

const Photos = mongoose.model('Photos', photoSchema);

module.exports = Photos;
