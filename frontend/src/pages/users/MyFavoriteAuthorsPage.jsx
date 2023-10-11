import React from 'react';
import { useGetFavoriteUsersQuery } from "../../slices/usersApiSlice.js";
import Post from "../../components/Post.jsx";
import FavoriteUser from "../../components/FavoriteUser.jsx";

function MyFavoriteAuthorsPage(props) {
  const { data: favoriteUsers, isLoading: favoriteUsersLoading, refetch } = useGetFavoriteUsersQuery();
  return (
    <section>
      <div className="pb-4 border-b border-gray-600">
        <h3 className="text-center text-2xl">Favorite Authors</h3>
      </div>
      <div  className="relative mx-auto max-w-7xl">
        <div  className="grid max-w-lg gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
          { favoriteUsers?.map(favoriteUser => (
            <FavoriteUser key={favoriteUser._id} favoriteUser={favoriteUser}/>
          )) }
        </div>
      </div>
    </section>
  );
}

export default MyFavoriteAuthorsPage;