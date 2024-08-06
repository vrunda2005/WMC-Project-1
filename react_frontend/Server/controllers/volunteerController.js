import Volunteer from '../models/Volunteer.js';
import Event from '../models/Event.js';

const getVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find();
        res.json(volunteers);
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addVolunteer = async (req, res) => {
    const { eventId,  name, email, message, status } = req.body;

    if (!eventId || !name || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const newVolunteer = new Volunteer({
            eventId,
            // eventName,
            name,
            email,
            message,
            status: 'pending',
        });

        const savedVolunteer = await newVolunteer.save();
        res.status(201).json(savedVolunteer);
    } catch (error) {
        console.error('Error creating volunteer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteVolunteer = async (req, res) => {
    try {
        const volunteerId = req.params.id;
        await Volunteer.findByIdAndDelete(volunteerId);
        res.status(200).json({ message: 'Volunteer deleted successfully' });
    } catch (error) {
        console.error('Error deleting volunteer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export {
    getVolunteers,
    addVolunteer,
    deleteVolunteer
};
