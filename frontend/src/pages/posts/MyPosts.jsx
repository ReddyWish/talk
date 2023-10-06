import React from 'react';
import { useGetUsersQuery } from '../../slices/usersApiSlice.js';
import { useLocation } from "react-router-dom";
import Loader from '../../components/Loader.jsx';
import PostListRow from '../../components/PostListRow.jsx'
import { useGetMyPostsQuery } from "../../slices/postsApiSlice.js";
import { useSelector } from "react-redux";

function MyPosts(props) {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: myPosts, isLoading, refetch, error } = useGetMyPostsQuery();

  const handleRefetch = () => {
    refetch()
  }

  return (
    <>
      {isLoading ? <Loader/>
        : (
          myPosts?.length ? (<div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Author</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Posts</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {
                myPosts?.map(myPost => (
                  <PostListRow key={myPost._id} post={myPost} user={userInfo} refetchPosts={handleRefetch}/>
                ))
              }

              </tbody>
            </table>
          </div>)
            : (
              <h1 className='text-center text-2xl'>You have no Posts yet 😕</h1>
            )
        )}
    </>)
}

export default MyPosts;