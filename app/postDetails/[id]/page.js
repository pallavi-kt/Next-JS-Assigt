'use client';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { removePost, updatePost } from '@/app/redux/store';

const PostDetails = ({ params }) => {
  const router = useRouter();
  const { id } = params; 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const posts = useSelector((state) => state.posts);
  const post = posts.find((post) => post.id === Number(id));
  const dispatch = useDispatch();

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    if (!post) {
      router.push('/'); 
    }
  }, [post, router]);

  const handleDelete = () => {
    if (!isLoggedIn) {
      alert('You must be logged in to delete a post.');
      router.push('/login'); 
      return;
    }
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(removePost(post.id)); 
      router.push('/');
    }
  };

  const handleEditToggle = () => {
    if (!isLoggedIn) {
      alert('You must be logged in to edit a post.');
      router.push('/login'); 
      return;
    }
    setIsEditing(true); 
  };

  const handleSave = () => {
    dispatch(updatePost({ id: post.id, title, content }));
    alert('Post updated successfully!');
    setIsEditing(false); 
    router.push('/');
  };

  if (!post) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        {isEditing ? (
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2 mb-4"
          />
        ) : (
          post.title
        )}
      </h1>

      <p className="text-gray-700 mb-6">
        Created at: {post.date} ({post.dayOfWeek})
      </p>

      {isEditing ? (
        <textarea
          className="w-full border rounded p-2 mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <p>{post.content}</p>
      )}

      {isEditing ? (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleSave}
        >
          Save Changes
        </button>
      ) : (
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleEditToggle}
        >
          Edit Post
        </button>
      )}

      <button
        className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleDelete}
      >
        Delete Post
      </button>
    </div>
  );
};

export default PostDetails;
