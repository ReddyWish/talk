import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { calculateMinutesOfReading } from "../../helpers/calculateMinutesOfReading.jsx";


function PostPage(props) {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`/api/posts/${postId}`);
      setPost(data)
    }
    fetchPost();
  }, []);

  return (
<>
  {post &&  <main className="mt-10">

      <div className="mb-4 md:mb-0 w-full mx-auto relative">
        <div className="lg:px-0">
          <h2 className="text-4xl font-semiboldleading-tight text-neutral-600">
            {post.title}
          </h2>
        </div>

        <div className="flex pt-3 pb-2 space-x-1 text-sm text-gray-500">
          <time dateTime="2020-03-10"> Mar 10, 2020 </time>

          <span aria-hidden="true"> · {calculateMinutesOfReading(post.content) } min read</span>
          <span aria-hidden="true"> · By Ilia Shuvatov</span>

        </div>

        <img src={post.image} className="object-cover w-full h-[17em] rounded-lg"/>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-12">

        <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
          <p className="pb-6 text-neutral-600 font-light">
            {post.content}
          </p>
        </div>

        <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
          <div className="p-4 border-t border-b md:border md:rounded">
            <div className="flex py-2">
              <img src="https://randomuser.me/api/portraits/men/97.jpg"
                   className="h-10 w-10 rounded-full mr-2 object-cover" />
              <div>
                <p className="font-semibold text-gray-700 text-sm"> Mike Sullivan </p>
                <p className="font-semibold text-gray-600 text-xs"> Editor </p>
              </div>
            </div>
            <p className="text-neutral-6000 py-3">
              Mike writes about technology
              Yourself required no at thoughts delicate landlord it be. Branched dashwood do is whatever it.
            </p>
            <button className="px-2 py-1 flex w-full items-center justify-center rounded border-2 border-gray-100 focus:outline-none bg-slate-700 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-slate-800">
              Save as favorite
              <i className='bx bx-user-plus ml-2' ></i>
            </button>
          </div>
        </div>

      </div>
    </main>}
</>
  );
}

export default PostPage;