import { Link } from 'react-router-dom';
import { MdBookmarkAdd, MdBookmarkAdded } from 'react-icons/md';
import { useSelector } from "react-redux";
import {
  useAddUserAsFavoriteMutation,
  useDeleteUserProfileMutation,
  useRemoveUserFromFavoritesMutation
} from "../slices/usersApiSlice.js";
import { toast } from "react-toastify";

function UserListRow({ user, refetchFavoriteUsers, favoriteUsers, refetchAllUsers }) {
  const isFavorite = !!favoriteUsers?.find(favoriteUser => favoriteUser._id === user._id);
  const { userInfo } = useSelector((state) => state.auth);
  const [deleteUserProfile] = useDeleteUserProfileMutation();
  const [addUserAsFavorite] = useAddUserAsFavoriteMutation();
  const [removeUserFromFavorites] = useRemoveUserFromFavoritesMutation();

  const handleAddUserToFavorite = async (id) => {
    try {
      await addUserAsFavorite(id);
      refetchFavoriteUsers()
      toast.success('User added as Favorite')
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const handleRemoveUserFromFavorites = async (id) => {
    try {
      await removeUserFromFavorites(id);
      refetchFavoriteUsers()
      toast.success('User removed from Favorites')
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const handleDeleteUserProfile = async () => {
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        await deleteUserProfile(user._id).unwrap();
        toast.success('User and all his posts are deleted')
        refetchAllUsers();
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }


  return (
    <tr className="hover:bg-gray-50">
      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
        <div className="relative h-10 w-10">
          <Link to={`/profile/${user._id}`}>
            <img
              className="h-full w-full rounded-full object-cover object-center"
              src={user?.avatar ? user?.avatar : "/images/unknownuser.jpg"}
              alt=""
            />
          </Link>
        </div>
        <div className="text-sm pt-2">
          <div className="font-medium text-gray-700">
            <Link to={`/profile/${user._id}`}>
              {user?.name}
            </Link>
          </div>
        </div>
      </th>

      <td className="px-6 py-4">{user?.profession}</td>
      <td className="px-6 py-4">
        <Link to={`/posts/${user._id}`} state={{ user }}>Posts</Link>
      </td>

      {userInfo.isAdmin ? (<td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          <button x-data="{ tooltip: 'Delete' }" onClick={handleDeleteUserProfile}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
              x-tooltip="tooltip"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <Link x-data="{ tooltip: 'Edite' }" to={`/updateuser/${user._id}`} state={{user}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
              x-tooltip="tooltip"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </Link>
        </div>
      </td>) : (
        !isFavorite
          ? <td> <MdBookmarkAdd onClick={() => handleAddUserToFavorite(user._id)} className='mb-2 ml-10 cursor-pointer h-6 w-6' title='add to favorites'/> </td>
          :  <td> <MdBookmarkAdded onClick={() => handleRemoveUserFromFavorites(user._id)} className='mb-2 ml-10 cursor-pointer h-6 w-6' title='remove from favorites'/> </td>
      )}
    </tr>
  );
}

export default UserListRow;