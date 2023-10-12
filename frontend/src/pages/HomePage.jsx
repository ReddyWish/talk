import { Link } from "react-router-dom";
import Post from '../components/Post.jsx';
import { useParams } from 'react-router-dom';
import { useGetPostsQuery } from "../slices/postsApiSlice.js";
import { setPostsCredentials } from "../slices/postsListSlice.js";
import { useDispatch } from 'react-redux';
import Paginate from "../components/Paginate.jsx";
import Loader from "../components/Loader.jsx";
import { useEffect } from "react";
import Search from "../components/Search.jsx";

function HomePage(props) {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetPostsQuery({ keyword, pageNumber });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setPostsCredentials(data.postsWithUsername))
    }
  }, [dispatch, data]);

  return (
    <>
      {isLoading
        ? (<Loader/>)
        : error ? (
            <div>
              {error?.data?.message || error.error}
            </div>)
          : (
            <div>
              <section>
                <div className="pb-2">
                  <h3 className="text-center text-2xl">Latest Posts</h3>
                </div>
                <Search/>
                <div className="relative mx-auto max-w-7xl">
                  <div className="grid max-w-lg gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
                    {data?.postsWithUsername.map(post => (
                      <Post key={post._id} post={post}/>
                    ))}
                  </div>
                </div>
              </section>
              <div className='flex justify-center'>
              <Paginate pages={data?.pages} page={data?.page} keyword={keyword ? keyword : ''}  />
              </div>
            </div>
          )}

    </>
  );
}

export default HomePage;