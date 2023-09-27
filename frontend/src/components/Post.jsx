import React from 'react';
import { Link } from "react-router-dom";
import { calculateMinutesOfReading } from "../helpers/calculateMinutesOfReading.jsx";

function Post({ post }) {
  return (
    <div className="flex flex-col mb-12 overflow-hidden cursor-pointer">
      <Link to={`/post/${post._id}`}>
        <div className="flex-shrink-0">
          <img className="object-cover w-full h-48 rounded-lg" src={post.image} alt="image"/>
        </div>
      </Link>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex-1">
          <Link to={`/post/${post._id}`}>
            <div className="flex pt-6 space-x-1 text-sm text-gray-500">
              <time dateTime="2020-03-10"> Mar 10, 2020</time>

              <span aria-hidden="true"> · {calculateMinutesOfReading(post.content)} min read</span>
              <span aria-hidden="true"> · By Ilia Shuvatov</span>

            </div>
          </Link>
          <Link to={`/post/${post._id}`} className="block mt-2 space-y-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">{post.title}</h3>
          </Link>
          <div className="block mt-2 space-y-6">
            <Link to={`/post/${post._id}`} className="block mt-2 space-y-6">
              <p className="text-lg font-normal text-gray-500 line-clamp-4">{post.content}</p>
            </Link>
            <p className="space-x-1 text-sm text-gray-500">
              <span className='italic text-neutral-600'>
               <Link to='/'>By Ilya Shuvatov</Link>
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Post;