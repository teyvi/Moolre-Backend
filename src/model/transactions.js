const mongoose= require('mongoose');

const transactionSchema = new mongoose.Schema({
  externalRef: { type: String, required: true, unique: true }, 
  moolreTransactionId: { type: String }, 
  thirdPartyRef: { type: String }, 
  accountNumber: { type: String, required: true }, 
  receiver: { type: String, required: true },
  receiverName: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'GHS' },
  channel: { type: Number, required: true },  
  type: { type: Number, default: 1 },
  sublistId: { type: String },
  reference: { type: String },
  txStatus: { 
    type: Number, 
    enum: [0, 1, 2, 3], 
    default: 0, 
    description: "1=Success, 0=Pending, 2=Failed, 3=Unknown"
  },
 
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);