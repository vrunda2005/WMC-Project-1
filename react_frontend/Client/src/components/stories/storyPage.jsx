import React, { useState, useEffect } from 'react';
import { useAuth } from '../../creatContext';
import { useTheme } from '../../usetheamContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Home/Home.jsx'

// const getRandomColor = () => {
//   const letters = '582839'; // use letters for light colors
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * letters.length)];
//   }
//   return color;
// };

const StoryPage = () => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState('');
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [colors, setColors] = useState([]);
  axios.defaults.withCredentials = true;

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
         console.log('Fetched stories:', data); // Log the data for debugging
        // Generate random colors for each story
        const newColors = data.map(() => getRandomColor());
        setColors(newColors);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
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

  const { theme } = useTheme();
  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textPrimary = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
  const textSecondary = theme === 'blue' ? 'text-blue-text-blue' : 'text-dark-text-blue';
  const overlay = theme === 'blue' ? 'bg-blue-overlay' : 'bg-dark-overlay';

  return (
    <div className='ml-[30vw] flex justify-end p-10'>
          <div className='fixed left-0 top-30 flex flex-col p-8'>
            <h1 className='text-6xl text-left text-white m-0 p-0'>Stories</h1>
          </div>
      <div className={`min-h-screen ${overlay} max-w-screen-lg mx-auto py-8 px-4 sm:px-6 lg:px-8`}>
        {auth.isLoggedIn ? (
          <>
            <div className="mb-12 bg-zinc-800 rounded-lg shadow-xl p-6">
              <h2 className={`text-3xl font-bold mb-4 ${textSecondary}`}>Add Your Story</h2>
              <textarea
                className="w-full p-4 border bg-zinc-900 border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="5"
                placeholder="Share your story..."
                value={newStory}
                onChange={(e) => setNewStory(e.target.value)}
              />
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                onClick={handleAddStory}
              >
                Submit Story
              </button>
            </div>
          </>
        ) : (
          <div className="mt-8 text-center">
            <h2 className={`text-2xl font-bold mb-4 ${textSecondary}`}>Sign in to Add Your Story</h2>
            <p className="text-gray-600">Please sign in to share your story and contribute to our community.</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mt-4"
              onClick={() => {
                navigate(`/Login`);
              }}
            >
              Sign In
            </button>
          </div>
        )}

        <h1 className="mt-12 text-3xl font-bold text-center mb-8">Stories</h1>

        {loading ? (
          <div className="text-center py-8">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <p>Loading stories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story._id}
            className="stories border-gray-300 bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:shadow-2xl w-72"
          >
                      {story.username?.image ? (
                  <img
                    src={story.username.image}
                    alt={`${story.username}'s profile`}
                    className="w-12 h-12 rounded-full mb-4"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full mb-4 bg-gray-300">NO image</div> // Placeholder if no image
                )}
            <p className="text-white mb-4">"{story.story}"</p>
            <h2 className="text-xl font-bold mb-2 text-white text-right">-{story.username}</h2>
            <p className="text-white text-sm text-right">{new Date(story.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
        )}
      </div>
    </div>
  );
};

export default StoryPage;
