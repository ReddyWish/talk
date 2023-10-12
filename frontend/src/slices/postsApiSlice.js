import { POSTS_URL, UPLOAD_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: POSTS_URL,
        params: {
          keyword,
          pageNumber,
        }
      }),
      keepUnusedDataFor: 5
    }),
    getPost: builder.query({
      query: (id) => ({
        url: `${POSTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Post']
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POSTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post']
    }),
    getMyPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}/myposts`
      }),
      keepUnusedDataFor: 5
    }),
    getMyFavoritePosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}/myfavoriteposts`
      }),
      keepUnusedDataFor: 5
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: POSTS_URL,
        method: 'POST',
        body: { ...post }
      })
    }),
    likePost: builder.mutation({
      query: ({ postId }) => ({
        url: `${POSTS_URL}/like/${postId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Post']
    }),
    createPostComment: builder.mutation({
      query: ({ comment, postId }) => ({
        url: `${POSTS_URL}/${postId}/comments`,
        method: 'POST',
        body: { comment }
      }),
      invalidatesTags: ['Post']
    }),
    deletePostComment: builder.mutation({
      query: ({ commentId, postId }) => ({
        url: `${POSTS_URL}/${postId}/comments/${commentId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Post']
    }),
    editPostComment: builder.mutation({
      query: ({ inputComment, commentId, postId }) => ({
        url: `${POSTS_URL}/${postId}/comments/${commentId}`,
        method: 'PUT',
        body: { comment: inputComment }
      }),
      invalidatesTags: ['Post']
    }),
    uploadPostImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data
      })
    }),
    updatePost: builder.mutation({
      query: ({ data, id }) => ({
        url: `${POSTS_URL}/${id}`,
        method: 'PUT',
        body: data
      })
    }),
    editPost: builder.mutation({
      query: ({ data, id }) => ({
        url: `${POSTS_URL}/edit/${id}`,
        method: 'PUT',
        body: data
      })
    }),
    addPostToFavorites: builder.mutation({
      query: (id) => ({
        url: `${POSTS_URL}/favorite/${id}`,
        method: 'PUT',
      })
    }),
    removePostFromFavorites: builder.mutation({
      query: (id) => ({
        url: `${POSTS_URL}/favorite/remove/${id}`,
        method: 'PUT',
      })
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useGetMyPostsQuery,
  useGetMyFavoritePostsQuery,
  useUploadPostImageMutation,
  useUpdatePostMutation,
  useEditPostMutation,
  useCreatePostCommentMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useDeletePostCommentMutation,
  useEditPostCommentMutation,
  useAddPostToFavoritesMutation,
  useRemovePostFromFavoritesMutation
} = postsApiSlice;