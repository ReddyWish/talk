import React from 'react';
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { calculateMinutesOfReading } from "../helpers/calculateMinutesOfReading.jsx";

function Post({ post }) {

  const formattedDate = format(new Date(post?.createdAt), 'MMMM dd, yyyy');
  return (
    <div className="flex flex-col mb-12 overflow-hidden cursor-pointer">
      <Link to={`/post/${post._id}`} state={{ post }}>
        <div className="flex-shrink-0">
          <img className="object-cover w-full h-48 rounded-lg" src={post.image} alt="image"/>
        </div>
      </Link>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex-1">
          <Link to={`/post/${post._id}`} state={{ post }}>
            <div className="flex pt-6 space-x-1 text-sm text-gray-500">
              <time dateTime={formattedDate}> {formattedDate}</time>

              <span aria-hidden="true"> · {calculateMinutesOfReading(post.content)} min read</span>
              {post.username && <span aria-hidden="true"> · By {post.username}</span>}

            </div>
          </Link>
          <Link to={`/post/${post._id}`} state={{ post }} className="block mt-2 space-y-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">{post.title}</h3>
          </Link>
          <div className="block mt-2 space-y-6">
            <Link to={`/post/${post._id}`} state={{ post }} className="block mt-2 space-y-6">
              <p className="text-lg font-normal text-gray-500 line-clamp-4">{post.content}</p>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Post;