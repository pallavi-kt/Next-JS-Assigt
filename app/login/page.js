'use client';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './../redux/store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const [prevUrl, setPrevUrl] = useState('/'); 

  useEffect(() => {
    
    setPrevUrl(document.referrer || '/'); 
  }, []);
  const handleAuth = () => {
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      dispatch(login());
    }
    router.push(prevUrl); 
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLoggedIn ? 'Welcome Back!' : 'Please Log In'}
        </h2>
        <button
          onClick={handleAuth}
          className={`w-full py-2 rounded text-white font-semibold ${
            isLoggedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
        {isLoggedIn && (
          <p className="mt-4 text-center text-gray-600">You are currently logged in.</p>
        )}
      </div>
    </div>
  );
}
