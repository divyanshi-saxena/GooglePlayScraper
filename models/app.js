const mongoose = require('mongoose')

// Schema for storing the apps
const AppSchema = new mongoose.Schema({
  appId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  isFree: {
    type: Boolean,
    required: true
  },
  developer: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  isValid: {
    type: Boolean,
    required: true,
    default: true
  },
  myUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('app', AppSchema)