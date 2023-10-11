import React from 'react';
import { MdBookmarkAdded } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useRemovePostFromFavoritesMutation } from "../slices/postsApiSlice.js";

function FavoritePost({ favoritePost, refetchFavoritesPosts }) {

  const [removePostFromFavorites] = useRemovePostFromFavoritesMutation()
  const handleRemovePostFromFavorites = async (id) => {
    try {
      await removePostFromFavorites(id).unwrap();
      refetchFavoritesPosts()
      toast.success('Post removed from Favorites')
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div className="px-2">
      <article
        className="mx-auto my-10 flex max-w-md flex-col rounded-2xl bg-white px-4 shadow md:max-w-5xl md:flex-row md:items-center">
        <div className="shrink-0 my-4 md:mr-8 md:max-w-sm">
          <img className="rounded-2xl object-cover" src={favoritePost.image} alt='image'/>
        </div>
        <div className="py-4 sm:py-8">
          <div className='flex justify-between'>
            <Link to={`/post/${favoritePost._id}`} className="mb-6 block text-2xl font-medium text-gray-700">{favoritePost.title}</Link>
            <MdBookmarkAdded className='mt-2' title='Remove From Favorites' onClick={() => handleRemovePostFromFavorites(favoritePost._id)}/>
          </div>
          <p className="mb-6 text-gray-500 line-clamp-3">{favoritePost.content}</p>
          <Link to={`/profile/${favoritePost.user._id}`}>
          <div className="flex items-center">
            <img className="h-10 w-10 rounded-full object-cover"
                 src={favoritePost.user.avatar || '/images/unknownuser.jpg'} alt="avatar"/>
            <p className="ml-4 w-56">
              <strong className="block font-medium text-gray-700">{favoritePost.user.name}</strong>
            </p>
          </div>
          </Link>
        </div>
      </article>
    </div>

  );
}

export default FavoritePost;