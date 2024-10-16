import { configureStore, createSlice } from '@reduxjs/toolkit';


const loadPostsFromLocalStorage = () => {
  const storedPosts = localStorage.getItem('posts');
  return storedPosts ? JSON.parse(storedPosts) : [];
};


const savePostsToLocalStorage = (posts) => {
  localStorage.setItem('posts', JSON.stringify(posts));
};


const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: !!localStorage.getItem('isLoggedIn') }, 
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true'); 
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn'); 
    },
  },
});

// Posts slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: loadPostsFromLocalStorage(), 
  reducers: {
    addPost: (state, action) => {
      const updatedState = [...state, action.payload]; 
      savePostsToLocalStorage(updatedState); 
      return updatedState;
    },
    removePost: (state, action) => {
      const updatedState = state.filter((post) => post.id !== action.payload); 
      savePostsToLocalStorage(updatedState); 
      return updatedState; 
    },
    updatePost: (state, action) => {
      const { id, title, content } = action.payload; 
      const updatedState = state.map((post) => 
        post.id === id ? { ...post, title, content } : post 
      );
      savePostsToLocalStorage(updatedState); 
      return updatedState; 
    },
  },
});


export const { login, logout } = authSlice.actions;
export const { addPost, removePost, updatePost } = postsSlice.actions;


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    posts: postsSlice.reducer,
  },
});

export default store;
