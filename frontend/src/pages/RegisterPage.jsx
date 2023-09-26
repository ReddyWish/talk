import React from 'react';
import { Link } from "react-router-dom";


function RegisterPage(props) {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="rounded-lg px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center bg-opacity-50 bg-blur">
          <form className="text-center">
            <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
              Sign Up
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
            <div className="py-2 text-left">
              <input
                type="password"
                className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700"
                placeholder="Confirm Password"
              />
            </div>
            <div className="py-2">
              <button
                type="submit"
                className="border-2 border-gray-100 focus:outline-none bg-slate-700 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-slate-800"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center mt-12">
            <span>Already have an account?</span>
            <Link
              to="/login"
              className="font-light text-md text-indigo-600 underline font-semibold hover:text-indigo-800"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;