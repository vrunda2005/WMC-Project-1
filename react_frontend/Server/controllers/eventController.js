const Event = require('../models/Event');
const Registration = require('../models/Registration');
const cloudinary = require('cloudinary').v2; // Add cloudinary import if used

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addEvents = async (req, res) => {
    const { title, description, date, time, venue, duration, mode } = req.body;
    const file = req.files && req.files.file;

    if (!title || !description || !date || !time || !venue || !duration || !mode) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const options = {
        folder: "events",
        quality: 90,
        resource_type: "auto",
    };

    try {
        const response = await cloudinary.uploader.upload(file.tempFilePath, options);

        const newEvent = new Event({
            title,
            description,
            date,
            time,
            image: response.secure_url,
            venue,
            duration,
            mode
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        await Event.findByIdAndDelete(eventId);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateEvent = async (req, res) => {
    const { title, description, date, time, image, venue, duration, mode } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { title, description, date, time, image, venue, duration, mode },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.eventRegister = async (req, res) => {
    const { eventId, eventName, name, email, phone } = req.body;

    if (!eventId || !eventName || !name || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newRegistration = new Registration({
            eventId,
            eventName, // Save event name
            name,
            email,
            phone,
        });

        const savedRegistration = await newRegistration.save();
        res.status(201).json(savedRegistration);
    } catch (error) {
        console.error('Error saving registration:', error);
        res.status(500).json({ error: 'Failed to register' });
    }
};
