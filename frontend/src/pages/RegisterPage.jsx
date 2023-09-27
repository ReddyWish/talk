import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Modal from "../components/Modal.jsx";


function RegisterPage(props) {
  const [modalOpen, setModalOpen] = useState(true);

  const toggleModal = () => {
    setModalOpen(prev => !prev)
  }

  return (
    <>
    <section className="min-h-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="rounded-lg px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center bg-opacity-50 bg-blur">
        <Modal modalOpen={modalOpen} toggleModal={toggleModal}/>
          <form className="text-center">
            <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600 w-10">
              Sign Up {' '}
              <button
                onClick={toggleModal}
                type="button"
                className="inline-block rounded-full px-4 bg-primary text-m font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light">
                ?
              </button>
            </h1>
            <div className="py-2 text-left">
              <input
                type="text"
                className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700"
                placeholder="Name"
              />
            </div>
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
    </>
  );
}

export default RegisterPage;