import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postList: [],
}

const postsListSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsCredentials: (state, action) => {
      state.postList = action.payload;
    },
    giveLike: (state, action) => {
      const { postId, userId } = action.payload;
      const postIndex = state.postList.findIndex((p) => p._id === postId);
      if (postIndex === -1) {
        console.log('Post not Found');
        return
      }
      const post = state.postList[postIndex];
      const likeIndex = post.likes.findIndex((like) => like.toString() === userId.toString());

      const updatedPost = { ...post };

      if (likeIndex === -1) {
        updatedPost.likes = [ ...post.likes, userId.toString() ];
      } else {
        updatedPost.likes = post.likes.filter((like) => like.toString() !== userId.toString());
      }
state.postList[postIndex] = updatedPost;
    }
  }
})

export const { setPostsCredentials, giveLike } = postsListSlice.actions;

export default postsListSlice.reducer;