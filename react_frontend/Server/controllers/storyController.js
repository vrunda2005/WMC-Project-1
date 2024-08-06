import Story from '../models/Story.js';
import User from '../models/User.js'; // Import if needed

export const getStories = async (req, res) => {
    try {
      const stories = await Story.find()
      .populate('username', 'image name') // Populate userId with user's image and name
      .sort({ date: -1 });   
      res.json(stories);
    } catch (error) {
      console.error('Error fetching stories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
  // Endpoint to add a new story
export const addStory = async (req, res) => {
    const { username, story } = req.body;
    if (!username || !story) {
      return res.status(400).json({ error: 'Username and story are required' });
    }
    try {
      const user = await User.findOne({name:username});
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newStory = new Story({ username, story });
      const savedStory = await newStory.save();
      res.status(201).json(savedStory);
    } catch (error) {
      console.error('Error adding story:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};