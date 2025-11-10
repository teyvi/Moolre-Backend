const mongoose = require('mongoose');

const validationSchema = new mongoose.Schema({
  type: { type: Number, required: true },
  receiver: { type: String, required: true },
  channel: { type: Number, required: true },
  currency: { type: String, required: true },
  accountnumber: { type: String, required: true },
  validationStatus: { 
    type: String, 
    enum: ['success', 'failed'], 
    required: true 
  },
  validationResponse: { type: Object },
  validatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Validation', validationSchema);