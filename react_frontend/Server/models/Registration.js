const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    eventName: { type: String, required: true }, // Add this line
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
});
  
module.exports = mongoose.model('Registration', registrationSchema);