'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addPost, removePost } from './redux/store';
import { useRouter } from 'next/navigation';

const daysOfWeek = [
  { label: 'Sunday', value: 'Sunday' },
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
];

export default function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('You must be logged in to create a post.'); 
      router.push('/login');
      return;
    }

    if (title && content) {
      const creationDate = new Date();
      const newPost = {
        id: Date.now(),
        title,
        content,
        date: creationDate.toLocaleDateString(), 
        dayOfWeek: creationDate.toLocaleString('en-US', { weekday: 'long' }), 
      };
      dispatch(addPost(newPost));
      setTitle('');
      setContent('');
    }
  };

 
  const handleDayChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedDays((prev) => [...prev, value]);
    } else {
      setSelectedDays((prev) => prev.filter((day) => day !== value));
    }
  };

  
  const handleReset = () => {
    setSelectedDays([]); 
  };

  
  const filteredPosts = selectedDays.length === 0 
    ? posts 
    : posts.filter(post => selectedDays.includes(post.dayOfWeek));

  
  const weeklyData = daysOfWeek.map(day => {
    const count = posts.filter(post => post.dayOfWeek === day.value).length;
    return { day: day.label, count };
  });
  const handleDelete = (postId) => {
    if (!isLoggedIn) {
      alert('You must be logged in to delete a post.');
      router.push('/login'); 
      return;
    }
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(removePost(postId)); 
    }
  };
  const handlePostClick = (postId) => {
    router.push(`/postDetails/${postId}`); 
  };

  return (
    <div className="p-8 flex">
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create a New Blog Post</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded p-2"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
          >
            Save Post
          </button>
        </form>

       
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Filter by Day:</h2>
          <div className="flex flex-wrap space-x-4 mb-4">
            {daysOfWeek.map(day => (
              <div key={day.value} className="flex items-center">
                <input
                  type="checkbox"
                  value={day.value}
                  id={day.value}
                  onChange={handleDayChange}
                  checked={selectedDays.includes(day.value)} 
                  className="mr-2"
                />
                <label htmlFor={day.value} className="text-gray-700">{day.label}</label>
              </div>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded"
          >
            Reset
          </button>
        </div>

        
        <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
        <ul className="bg-white p-6 rounded shadow-md">
          {filteredPosts.length === 0 ? (
            <li className="text-gray-500">No posts available.</li>
          ) : (
            filteredPosts.map((post) => (
              <li key={post.id} className="mb-4 border-b pb-2">
                <h3 className="font-bold"
                onClick={() => handlePostClick(post.id)}>{post.title}</h3>
                <span className="text-gray-500 text-sm">
                  Created on: {post.date} ({post.dayOfWeek})
                </span>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      
      <div className="ml-8">
        <h2 className="text-xl font-semibold mb-4">Weekly Data</h2>
        <div className="bg-white p-4 rounded shadow-md">
          {weeklyData.map((data) => (
            <div key={data.day} className="flex justify-between mb-2">
              <span>{data.day}:</span>
              <span>{data.count} {data.count === 1 ? 'post' : 'posts'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
