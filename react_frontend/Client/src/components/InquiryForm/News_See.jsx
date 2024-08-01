import React, { useEffect, useState } from 'react';

const UserNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/news');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-6 h-screen page-background bg-opacity-10 ">
      <h1 className="text-3xl font-bold mb-6">Epsilon Program News</h1>
      {news.length === 0 ? (
        <p>No news available.</p>
      ) : (
        <div className='flex flex-row p-7 gap-10'>
          {news.map((item) => (
            <div key={item._id} className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
              <p className="mb-4">{item.description}</p>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full max-w-lg rounded-lg shadow-lg"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserNews;
