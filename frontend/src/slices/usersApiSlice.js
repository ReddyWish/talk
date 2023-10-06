import { USERS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['User']
    }),
    getFavoriteUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}/favorite`
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['User']
    }),
    getUsersPosts: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/posts/${id}`
      }),
      keepUnusedDataFor: 5
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`
      }),
      keepUnusedDataFor: 5,
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    registration: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      })
    }),
    addUserAsFavorite: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/favorite/${id}`,
        method: 'PUT',
      })
    }),
    removeUserFromFavorites: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/favorite/remove/${id}`,
        method: 'PUT',
      })
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`
      }),
      keepUnusedDataFor: 5
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegistrationMutation,
  useGetUserByIdQuery,
  useGetUsersPostsQuery,
  useUpdateUserProfileMutation,
  useGetUsersQuery,
  useGetFavoriteUsersQuery,
  useAddUserAsFavoriteMutation,
  useRemoveUserFromFavoritesMutation,
  useGetUserProfileQuery,
} = usersApiSlice;