import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (currentId, updatedPost) => API.patch(`/posts/${currentId}`, updatedPost);
export const deletePost = (currentId) => API.delete(`/posts/${currentId}`);
export const likePost = (currentId) => API.patch(`/posts/${currentId}/likePost`);

export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);