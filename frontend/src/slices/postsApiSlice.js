import { POSTS_URL, UPLOAD_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: POSTS_URL
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
    createPost: builder.mutation({
      query: (post) => ({
        url: POSTS_URL,
        method: 'POST',
        body: { ...post }
      })
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
    })
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useGetMyPostsQuery,
  useUploadPostImageMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApiSlice;