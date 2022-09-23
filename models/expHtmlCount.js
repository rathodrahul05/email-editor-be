const mongoose = require("mongoose");

const expHtml = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tempJSON:{
    type:Object
  },
  count:{
    type:Number
  }
  
});
module.exports = mongoose.model("EXPHtmlCount", expHtml);