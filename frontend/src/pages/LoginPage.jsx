import { Link } from "react-router-dom";
import { useState } from 'react';


function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Login Submit handler')
  }

  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="rounded-lg px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center bg-opacity-50 bg-blur">

          <form className="text-center" onSubmit={submitHandler}>
            <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
              Sign in
            </h1>
            <div className="py-2 text-left">
              <input
                type="email"
                className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700"
                placeholder="Email"
              />
            </div>
            <div className="py-2 text-left">
              <input
                type="password"
                className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700"
                placeholder="Password"
              />
            </div>
            <div className="py-2">
              <button
                type="submit"
                className="border-2 border-gray-100 focus:outline-none bg-slate-700 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-slate-800"
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