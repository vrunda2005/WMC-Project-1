import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String }
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;