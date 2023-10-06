import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Loader from "../components/Loader.jsx";
import { useLoginMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { toast } from 'react-toastify';


function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div
          className="rounded-lg px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center bg-opacity-50 bg-blur">

          <form className="text-center" onSubmit={submitHandler}>
            <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
              Sign in
            </h1>
            <div className="py-2 text-left">
              <input
                type="email"
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700"
                placeholder="Email"
              />
            </div>
            <div className="py-2 text-left">
              <input
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700"
                placeholder="Password"
              />
            </div>
            <div className="py-2">
              <button
                type="submit"
                disabled={!email || !password}
                className={`border-2 focus:outline-none font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-slate-800
    ${!email || !password ? 'opacity-50 cursor-not-allowed bg-gray-400 text-gray-700 border-gray-400' : 'border-gray-100 bg-slate-700 text-white hover:bg-slate-800'}`}
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="text-center">
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>
          {isLoading && <Loader/>}
          <div className="text-center mt-12">
            <span>Don't have an account?</span>
            <Link
              to="/register"
              className="font-light text-md text-indigo-600 underline font-semibold hover:text-indigo-800"
            >
              Create One
            </Link>
          </div>
        </div>
      </div>
    </section>

  );
}

export default LoginPage;