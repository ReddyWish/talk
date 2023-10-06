import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { calculateMinutesOfReading } from "../../helpers/calculateMinutesOfReading.jsx";
import Loader from "../../components/Loader.jsx";
import { useGetPostQuery } from "../../slices/postsApiSlice.js";
import { useGetUserByIdQuery } from "../../slices/usersApiSlice.js";
import { useSelector } from "react-redux";


function PostPage(props) {
  const { postId } = useParams();

  const location = useLocation();

  const { data: post, isLoading, error } = useGetPostQuery(postId);
  const userId = post?.user;

  const { data: user, isLoading: userLoading, error: userError } = useGetUserByIdQuery(userId);

  return (
    <>
      {userLoading ? (<Loader/>) : (<main className="mt-10">

        <div className="mb-4 md:mb-0 w-full mx-auto relative">
          <div className="lg:px-0">
            <h2 className="text-4xl font-semiboldleading-tight text-neutral-600">
              {post?.title}
            </h2>
          </div>

          <div className="flex pt-3 pb-2 space-x-1 text-sm text-gray-500">
            <time dateTime="2020-03-10"> Mar 10, 2020</time>

            <span aria-hidden="true"> · {calculateMinutesOfReading(post?.content)} min read</span>
            <span aria-hidden="true"> · By {user?.name}</span>

          </div>

          <img src={post?.image} className="object-contain w-full h-[17em] rounded-lg mt-4"/>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-12">

          <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
            <p className="pb-6 text-neutral-600 font-light">
              {post?.content}
            </p>
          </div>

          {user ? (<div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
            <div className="p-4 border-t border-b md:border md:rounded">
              <div className="flex py-2">
                {user?.avatar ? (
                  <img src={user.avatar} alt="avatar" className="h-10 w-10 rounded-full mr-2 object-cover"/>) : (
                  <img src="/images/unknownuser.jpg"
                       className="h-10 w-10 rounded-full mr-2 object-cover"/>)}
                <div>
                  <p className="font-semibold text-gray-700 text-sm"> {user?.name} </p>
                </div>
              </div>
              <p className="text-neutral-6000 py-3">
                {user?.description}
              </p>
              <button
                className="px-2 py-1 flex w-full items-center justify-center rounded border-2 border-gray-100 focus:outline-none bg-slate-700 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-slate-800">
                Save author as favorite
                <i className='bx bx-user-plus ml-2'></i>
              </button>
            </div>
          </div>) : <Loader/>}

        </div>
      </main>)}

    </>
  );
}

export default PostPage;