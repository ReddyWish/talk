import React from 'react';
import { useState, useRef } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick.js'
import { Link } from "react-router-dom";

function ProfileDropDown({ isProfileOpen, toggleProfile, handleLinkClick, setIsProfileOpen }) {
  const ref = useRef();
  useOutsideClick(ref, () => setIsProfileOpen(false))
  return (

    <>
      <div className="hidden lg:flex lg:gap-x-12">
        <div className="relative">
          {/*<button type="button" className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900" aria-expanded="false">*/}
          {/*  Posts*/}
          {/*</button>*/}
          <button type="button" ref={ref}
                  className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                  aria-expanded="false" onClick={() => toggleProfile()}>
            Profile
            <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"/>
            </svg>
          </button>
          <div
            className={`${'absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5'} ${isProfileOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="p-4">
              <div
                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                <div className="flex-auto">
                  <button onClick={() => handleLinkClick("myprofile")} className="block font-semibold text-gray-900">
                    My Profile
                    <span className="absolute inset-0"></span>
                  </button>
                  <p className="mt-1 text-gray-600">View and Edit your profile</p>
                </div>
              </div>
              <div
                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                <div className="flex-auto">
                  <button onClick={() => handleLinkClick("/myposts")} className="block font-semibold text-gray-900">
                    My Posts
                    <span className="absolute inset-0"></span>
                  </button>
                  <p className="mt-1 text-gray-600">Read and Edit your Posts</p>
                </div>
              </div>
              <div
                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                <div className="flex-auto">
                  <button onClick={() => handleLinkClick("/myfavoriteposts")}
                          className="block font-semibold text-gray-900">
                    Favorite Posts
                    <span className="absolute inset-0"></span>
                  </button>
                  <p className="mt-1 text-gray-600">Read your Favorite Posts</p>
                </div>
              </div>
              <div
                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                <div className="flex-auto">
                  <button onClick={() => handleLinkClick("/myfavoriteauthors")}
                          className="block font-semibold text-gray-900">
                    Favorite authors
                    <span className="absolute inset-0"></span>
                  </button>
                  <p className="mt-1 text-gray-600">Get to know better your favorite authors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/authors" className="text-sm font-semibold leading-6 text-gray-900">Authors</Link>
        <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">About</Link>
        <Link to="/contact" className="text-sm font-semibold leading-6 text-gray-900">Contact</Link>
      </div>
    </>

  );
}

export default ProfileDropDown;