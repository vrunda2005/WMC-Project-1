import Story from '../models/Story.js';

export const getStories = async (req, res) => {
    try {
      const stories = await Story.find().sort({ date: -1 }); // Sorting by date descending
      res.json(stories);
    } catch (error) {
      console.error('Error fetching stories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
  // Endpoint to add a new story
export const addStory = async (req, res) => {
    const { username, story } = req.body;
    try {
      const newStory = new Story({ username, story });
      const savedStory = await newStory.save();
      res.status(201).json(savedStory);
    } catch (error) {
      console.error('Error adding story:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};