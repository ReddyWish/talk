import React, { useState } from 'react';
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { calculateMinutesOfReading } from "../helpers/calculateMinutesOfReading.jsx";
import { useLikePostMutation, useGetPostQuery } from "../slices/postsApiSlice.js";
import { giveLike } from "../slices/postsListSlice.js";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function Post({ post }) {
  const dispatch = useDispatch();
  const [likePost] = useLikePostMutation()
  const { postList } = useSelector((state) => state.posts);
  const { userInfo } = useSelector((state) => state.auth);
  const givenLike = postList?.find((p) => p._id === post._id)?.likes.find((like) => like === userInfo?._id);
  const postId = post?._id;
  const userId = userInfo?._id;
  const likeAmount = (postList.find((p) => p._id === post._id))?.likes.length
  const handlePostLike = async () => {
    try {
     const { message } = await likePost({ postId }).unwrap();
      if (message === 'Like success') {
        dispatch(giveLike({ postId, userId }));
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const formattedDate = format(new Date(post?.createdAt), 'MMMM dd, yyyy');
  return (
    <div className="flex flex-col mb-12 overflow-hidden cursor-pointer">
      <Link to={`/post/${postId}`} state={{ post }}>
        <div className="flex-shrink-0">
          <img className="object-cover w-full h-48 rounded-lg" src={post.image} alt="image"/>
        </div>
      </Link>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex-1">
          <Link to={`/post/${postId}`} state={{ post }}>
            <div className="flex pt-6 space-x-1 text-sm text-gray-500">
              <time dateTime={formattedDate}> {formattedDate}</time>

              <span aria-hidden="true"> · {calculateMinutesOfReading(post.content)} min read</span>
              {post.username && <span aria-hidden="true"> · By {post.username}</span>}

            </div>
          </Link>
          <Link to={`/post/${postId}`} state={{ post }} className="block mt-2 space-y-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">{post.title}</h3>
          </Link>
          <div className="block mt-2 space-y-6 mb-3">
            <Link to={`/post/${postId}`} state={{ post }} className="block mt-2 space-y-6">
              <p className="text-lg font-normal text-gray-500 line-clamp-4">{post.content}</p>
            </Link>
          </div>
          <div className='flex'>
            {
              givenLike
              ? (<AiFillLike onClick={handlePostLike}/>)
                : (<AiOutlineLike onClick={handlePostLike}/>)
            }
            <p className='text-xs ml-1'>{likeAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;