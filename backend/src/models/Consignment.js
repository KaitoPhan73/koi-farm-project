const mongoose = require('mongoose');
const { Schema } = mongoose;

const consignmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
  },
  address: {
    type: String,
    required: true,
  },
  koiType: {
    type: String,
    required: false,
  },
  selectedMethod: {
    type: String,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Consignment', consignmentSchema);
