import { Link, useParams } from 'react-router-dom';
import { calculateMinutesOfReading } from '../../helpers/calculateMinutesOfReading.jsx';
import Loader from '../../components/Loader.jsx';
import { MdBookmarkAdd, MdBookmarkAdded } from 'react-icons/md';
import {
  useGetPostQuery,
  useAddPostToFavoritesMutation,
    useRemovePostFromFavoritesMutation,
  useCreatePostCommentMutation
} from '../../slices/postsApiSlice.js';
import { useGetUserByIdQuery, useGetUserProfileQuery } from '../../slices/usersApiSlice.js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Comment from "../../components/Comment.jsx";
import { FiSettings } from 'react-icons/fi';
import React, { useState, useEffect } from "react";


function PostPage(props) {
  const [comment, setComment] = useState('');
  const [openCommentId, setOpenCommentId] = useState(null);

  const handleCommentOpen = (commentId) => {
    setOpenCommentId(commentId)
  }

  const handleCommentClose = () => {
    setOpenCommentId(null)
  }

  const { postId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: post, isLoading, refetch: refetchPost, error } = useGetPostQuery(postId);
  const { data: currentUser, isLoading: currentUserIsLoading, refetch } = useGetUserProfileQuery();

  const userId = post?.user;
  const { data: user, isLoading: userLoading, error: userError } = useGetUserByIdQuery(userId);

  const isFavorite = !!currentUser?.favoritePosts?.find(favoritePost => favoritePost === postId);

  const [addPostToFavorites] = useAddPostToFavoritesMutation();
  const [removePostFromFavorites] = useRemovePostFromFavoritesMutation();
  const [createPostComment] = useCreatePostCommentMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const createPostHandler = async () => {
    try {
      await createPostComment({ comment, postId }).unwrap();
      setComment('')
      refetchPost();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const handleAddPostToFavorites = async (id) => {
    try {
      await addPostToFavorites(id).unwrap();
      refetch();
      toast.success('Post added as Favorite')
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const handleRemovePostFromFavorites = async (id) => {
    try {
      await removePostFromFavorites(id).unwrap();
      refetch()
      toast.success('Post removed from Favorites')
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <>
      {userLoading ? (<Loader/>) : (<main className="mt-10">

        <div className="mb-4 md:mb-0 w-full mx-auto relative">
          <div className="lg:px-0 flex justify-between">
            <h2 className="text-4xl font-semiboldleading-tight text-neutral-600">
              {post?.title}
            </h2>
            {userInfo?.isAdmin && <Link to={`/editpost/${post?._id}`} className='underline'>Edit post</Link>}
            {
              userInfo && (isFavorite
                ? (<MdBookmarkAdded className='mt-3 w-4 h-4 cursor-pointer' title='Remove From Favorites'
                                    onClick={() => handleRemovePostFromFavorites(postId)}/>)
                : (<MdBookmarkAdd className='mt-3 w-4 h-4 cursor-pointer' title='Add To Favorites'
                                  onClick={() => handleAddPostToFavorites(postId)}/>))
            }
          </div>
          <div className="flex pt-3 pb-2 space-x-1 text-sm text-gray-500">
            <time dateTime="2020-03-10"> Mar 10, 2020</time>
            <span aria-hidden="true"> · {calculateMinutesOfReading(post?.content)} min read</span>
            <span aria-hidden="true"> · By {user?.name}</span>

          </div>

          <img src={post?.image} className="object-contain w-full h-[17em] rounded-lg mt-4" alt='image'/>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-12">

          <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
            <p className="pb-6 font-sans text-s">
              {post?.content}
            </p>
            {userInfo && <section className="bg-white py-8 lg:py-16 antialiased">
              <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg lg:text-2xl font-bold text-gray-700 ">Discussion</h2>
                </div>
                <div className="mb-6">
                  <div
                    className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200  ">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <textarea id="comment" rows="6" value={comment} onChange={(e) => setComment(e.target.value)}
                              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                              placeholder="Write a comment..." required></textarea>
                  </div>
                  <button onClick={createPostHandler} className={`border-2 focus:outline-none font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-slate-800
    ${!comment ? 'opacity-50 cursor-not-allowed bg-gray-400 text-gray-700 border-gray-400' : 'border-gray-100 bg-slate-700 text-white hover:bg-slate-800'}`}>Post
                  </button>
                </div>
                <div className="max-w-2xl mx-auto px-4">

                  {post?.comments.map(comment => <Comment key={comment._id}
                                                           comment={comment}
                                                           isOpen={comment._id === openCommentId}
                                                           postId={postId}
                                                           refetchPost={refetchPost}
                                                           onOpen={handleCommentOpen}
                                                           onClose={handleCommentClose}/>)}

                </div>
              </div>
            </section>}
          </div>

          {
            user ? (
                (userInfo?._id !== user._id) && (

                  <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                    <Link to={`/profile/${user._id}`}>
                      <div className="p-4 border-t border-b md:border md:rounded">
                        <div className="flex py-2">
                          {user?.avatar ? (
                            <img src={user.avatar} alt="avatar"
                                 className="h-10 w-10 rounded-full mr-2 object-cover"/>) : (
                            <img src="/images/unknownuser.jpg"
                                 className="h-10 w-10 rounded-full mr-2 object-cover" alt='default avatar'/>)}
                          <div>
                            <p className="font-semibold text-gray-700 text-sm"> {user?.name} </p>
                          </div>
                        </div>
                        <p className="font-sans text-gray-700 py-3">
                          {user?.description}
                        </p>
                      </div>
                    </Link>
                  </div>

                )
              )
              : <Loader/>
          }

        </div>
      </main>)}

    </>
  );
}

export default PostPage;