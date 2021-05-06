import * as api from '../api';

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_POSTS', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: 'CREATE_POST', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (currentId, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(currentId, post);
        dispatch({ type: 'UPDATE_POST', payload: data });
    } catch (error) {
        console.log(error);
    }
};