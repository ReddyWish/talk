import { Link } from "react-router-dom";
import Post from '../components/Post.jsx';
import { useGetPostsQuery } from "../slices/postsApiSlice.js";
import Loader from "../components/Loader.jsx";

function HomePage(props) {

  const { data: posts, isLoading, error } = useGetPostsQuery();

  return (
    <>
      { isLoading
        ? (<Loader/>)
        : error ? (
          <div>
            { error?.data?.message || error.error }
          </div>)
          : (
        <section>
          <div className="pb-4 border-b border-gray-600">
            <h3 className="text-xl font-semibold leading-6 text-gray-800">Latest Posts</h3>
          </div>
          <div  className="relative mx-auto max-w-7xl">
            <div  className="grid max-w-lg gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
              { posts.map(post => (
                <Post key={post._id} post={post}/>
              )) }
            </div>
          </div>
        </section>
      ) }

    </>
  );
}

export default HomePage;