import { POSTS_URL } from "../constants.js";
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
        url: `${POSTS_URL}/${id}`
      }),
      keepUnusedDataFor: 5
    })
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
} = postsApiSlice;