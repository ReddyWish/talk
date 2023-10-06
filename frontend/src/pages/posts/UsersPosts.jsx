import React from 'react';
import { useLocation, useParams } from "react-router-dom";
import { useGetUsersPostsQuery } from "../../slices/usersApiSlice.js";
import Post from "../../components/Post.jsx";

function UsersPosts() {
  const { id } = useParams()
  const {data: posts} = useGetUsersPostsQuery(id);
  const location = useLocation();
  const { user } = location.state || {};

  return (
    <section>
      <div className="pb-4 border-b border-gray-600">
        {user
          ? (
            posts?.length
              ? (<h3 className="text-xl font-semibold leading-6 text-gray-800">Posts of {user.name}</h3>)
              : (<h3 className="text-center text-2xl">{user.name} has no Posts yet 😕</h3>)
          )
          : <h3 className="text-xl font-semibold leading-6 text-gray-800">Latest Posts</h3>}
      </div>
      <div  className="relative mx-auto max-w-7xl">
        <div  className="grid max-w-lg gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
          { posts?.map(post => (
            <Post key={post._id} post={post}/>
          )) }
        </div>
      </div>
    </section>
  );
}

export default UsersPosts;