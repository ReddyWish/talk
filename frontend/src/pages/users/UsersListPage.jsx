import React, { useEffect } from 'react';
import { useGetUsersQuery, useGetFavoriteUsersQuery } from '../../slices/usersApiSlice.js';
import UserListRow from '../../components/UserListRow.jsx';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function UsersListPage(props) {
  const { data: users, isLoading: usersLoading, refetch: refetchAllUsers } = useGetUsersQuery();
  const { data: favoriteUsers, isLoading: favoriteUsersLoading, refetch } = useGetFavoriteUsersQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleRefetchFavoriteUsers = () => {
    refetch()
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
  }, [userInfo]);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Profession</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Posts</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">{!userInfo?.isAdmin &&
            <h2>Favorites</h2>}</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {
          users?.map(user => (
            userInfo?._id === user?._id
              ? ''
              : <UserListRow key={user._id} user={user} refetchAllUsers={refetchAllUsers} refetchFavoriteUsers={handleRefetchFavoriteUsers} favoriteUsers={favoriteUsers}/>
          ))
        }

        </tbody>
      </table>
    </div>
  );
}

export default UsersListPage;