const mongoose = require('mongoose')

const featuredSchema = new mongoose.Schema({
  topPicks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
  hereTable: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
}, { timestamps: true })

module.exports = mongoose.model('featured', featuredSchema)
