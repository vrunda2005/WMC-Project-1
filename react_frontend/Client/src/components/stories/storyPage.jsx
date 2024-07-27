import React, { useState, useEffect } from 'react';
import { useAuth } from '../../creatContext';
import { useTheme } from '../../usetheamContext';
import axios from 'axios';

const StoryPage = () => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState('');
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true); // Loading state
  axios.defaults.withCredentials=true;


  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch('http://localhost:5000/stories');
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchStories();
  }, []);

  const handleAddStory = async () => {
    if (!newStory) return;

    try {
      const response = await fetch('http://localhost:5000/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: auth.username, story: newStory }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
      }

      const addedStory = await response.json();
      setStories([...stories, addedStory]);
      setNewStory('');
    } catch (error) {
      console.error('Error adding story:', error);
    }
  };

  const {theme}=useTheme();
  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textPrimary = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
  const textSecondary = theme === 'blue' ? 'text-blue-text-blue' : 'text-dark-text-blue';
  const overlay=theme==='blue' ? 'bg-blue-overlay' : 'bg-dark-overlay'; 

  return (
    <div className={`bg-opacity-70 ${textPrimary} ${overlay} max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8`}>

      <div className="mt-8">
        <h2 className={`text-2xl font-bold mb-4 ${textSecondary}`}>Add Your Story</h2>
        <textarea
          className="w-full p-4 border rounded-lg mb-4"
          rows="5"
          placeholder="Share your story..."
          value={newStory}
          onChange={(e) => setNewStory(e.target.value)}
        />
        <button
          className="bg-orange-700 hover:bg-orange-800 text-white font-medium py-2 px-4 rounded-lg"
          onClick={handleAddStory}
        >
          Submit Story
        </button>
      </div>

      
      <h1 className="text-3xl font-bold text-center mb-8">Stories</h1>

      {loading ? (
        <div className="text-center py-8">
          <div className="spinner-border text-orange-600 mb-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading stories...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {stories.map((story) => (
            <div key={story._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">{story.username}</h2>
              <p className="text-gray-700 mb-2">{story.story}</p>
              <p className="text-gray-500 text-sm">{new Date(story.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default StoryPage;
