import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  useAddUserAsFavoriteMutation,
  useGetFavoriteUsersQuery,
  useGetUserByIdQuery, useRemoveUserFromFavoritesMutation
} from '../../slices/usersApiSlice.js';
import { MdBookmarkAdd, MdBookmarkAdded } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

function UsersProfilePage(props) {
  const { id } = useParams();
  const { data: user, isLoading } = useGetUserByIdQuery(id);
  const { data: favoriteUsers, isLoading: favoriteUsersLoading, refetch } = useGetFavoriteUsersQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const isFavorite = !!favoriteUsers?.find(favoriteUser => favoriteUser._id === id);
  const [addUserAsFavorite] = useAddUserAsFavoriteMutation();
  const [removeUserFromFavorites] = useRemoveUserFromFavoritesMutation();

  const handleAddUserToFavorite = async (id) => {
    try {
      await addUserAsFavorite(id);
      refetch()
      toast.success('User added as Favorite')
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const handleRemoveUserFromFavorites = async (id) => {
    try {
      await removeUserFromFavorites(id);
      refetch()
      toast.success('User removed from Favorites')
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-5">
      <div className='flex gap-5'>
        {
          userInfo?.isAdmin && (
          < Link to='/editmyprofile'>
          <FiSettings title='Edit'/>
          </Link>)
        }
        {
          !isFavorite
            ? <MdBookmarkAdd onClick={() => handleAddUserToFavorite(user._id)} className='mb-2 ml-1 cursor-pointer h-6 w-6' title='add to favorites'/>
            : <MdBookmarkAdded onClick={() => handleRemoveUserFromFavorites(user._id)} className='mb-2 ml-1 cursor-pointer h-6 w-6' title='remove from favorites'/>
        }
      </div>
      <div className="flex flex-col gap-1 text-center items-center">
        <img className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4 object-cover" src={user?.avatar ? user?.avatar : '/images/unknownuser.jpg'} alt=""/>
        <p className="font-semibold">{user?.name}</p>
        <p className='text-xs text-gray-400'> {user?.profession} </p>
        <div className="text-sm leading-normal text-gray-400 flex justify-center items-center">
          <svg viewBox="0 0 24 24" className="mr-1" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {user?.country}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 my-3">
        <div className="font-semibold text-center mx-4">
          <Link to={`/myposts`} state={{ user }} className="text-gray-600">Posts</Link>
        </div>
        <blockquote className="text-m text-gray-900">
          <svg className="w-3 h-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
          </svg>
          <p>{ user?.description }</p>
        </blockquote>
      </div>
    </div>
  );
}

export default UsersProfilePage;