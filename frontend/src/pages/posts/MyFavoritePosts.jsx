import React from 'react';
import FavoritePost from "../../components/FavoritePost.jsx";
import { useGetMyFavoritePostsQuery } from "../../slices/postsApiSlice.js";

function MyFavoritePosts(props) {
  const { data: myFavoritePosts, isLoading, refetch } = useGetMyFavoritePostsQuery();

  const handleRefetch = () => {
    refetch()
  }

  return (
    <>
    <div className="pb-4 border-b border-gray-600">
      { myFavoritePosts?.length ?
        <h3 className="text-center text-2xl">Favorite Posts</h3>
      :
      <h1 className='text-center'>You have no Favorite Posts yet 😕</h1>
      }
    </div>
     <div>
        {myFavoritePosts?.map(favoritePost => <FavoritePost key={favoritePost._id} favoritePost={favoritePost}
                                                            refetchFavoritesPosts={handleRefetch}/>)}
      </div>
    </>
  );
}

export default MyFavoritePosts;