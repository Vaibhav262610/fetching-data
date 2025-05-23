"use client"

import { useState, useEffect } from 'react';

function ContentList() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch content when component mounts
    fetch("http://localhost:3002/api/content?apiKey=06e401f5-fe18-4fb8-b2d0-6deca0054fa1")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading content...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.map(item => (
          <div key={item.id} className="border rounded-lg p-4">
            <img 
              src={item.imageUrl || "/placeholder.svg"} 
              alt={item.title} 
              className="w-full h-48 object-cover rounded-md mb-2" 
            />
            <h3 className="text-xl font-bold">{item.title}</h3>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {item.category}
            </span>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentList;