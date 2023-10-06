import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings } from "react-icons/fi";
import { useGetUserProfileQuery } from "../../slices/usersApiSlice.js";

function MyProfilePage(props) {
  const { data: user, isLoading: usersLoading } = useGetUserProfileQuery();

  return (
    <div className="bg-white shadow rounded-lg p-5">
      <Link to='/editmyprofile'>
        <FiSettings/>
      </Link>
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

export default MyProfilePage;