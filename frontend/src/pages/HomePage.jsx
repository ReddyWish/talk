import React from 'react';
import posts from "../posts.js";

function HomePage(props) {
  return (
    <section>
      <div className="pb-4 border-b border-gray-600">
        <h3 className="text-xl font-semibold leading-6 text-gray-800">Latest Entries</h3>
      </div>
      <div  className="relative mx-auto max-w-7xl">
        <div  className="grid max-w-lg gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
      { posts.map(post => (


            <div key={post._id} className="flex flex-col mb-12 overflow-hidden cursor-pointer">
              <a href="#">
                <div className="flex-shrink-0">
                  <img className="object-cover w-full h-48 rounded-lg" src={post.image} alt="image"/>
                </div>
              </a>
              <div className="flex flex-col justify-between flex-1">
                <a href="#"></a>
                <div className="flex-1">
                  <a href="#">
                    <div className="flex pt-6 space-x-1 text-sm text-gray-500">
                      <time dateTime="2020-03-10"> Mar 10, 2020 </time>
                      <span aria-hidden="true"> · </span>
                      <span> {post.time} </span>
                    </div>
                  </a>
                  <a href="#" className="block mt-2 space-y-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">{post.title}</h3>
                    <p className="text-lg font-normal text-gray-500">{post.content}</p>
                  </a>
                </div>
              </div>
            </div>


      )) }
        </div>
      </div>
    </section>
  );
}

export default HomePage;