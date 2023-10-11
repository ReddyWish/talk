import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import useOutsideClick from '../../hooks/useOutsideClick.js'
import ProfileDropDown from "./ProfileDropDown.jsx";
import MobileMenu from "./MobileMenu.jsx";
import { useLogoutMutation } from "../../slices/usersApiSlice.js";
import { logout } from "../../slices/authSlice.js";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Header(props) {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(true);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  }

  const handleLinkClick = (path) => {
    toggleMobileMenu();
    toggleProfile();
    navigate(path)
  }

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img src="/images/logo5.png"
                 className="h-12 w-12 rounded-full mr-2 object-contain"/>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => toggleMobileMenu()}>
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                 aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
            </svg>
          </button>

          <div className="space-y-2 py-6">
            {/*<button type="button"*/}
            {/*        className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
            {/*        aria-controls="disclosure-1" aria-expanded="false">*/}
            {/*  Posts*/}
            {/*</button>*/}


            {/*....*/}
            <div className="space-y-2 py-6">
              <div className="-mx-3">
                {!isMobileMenuOpen && <button type="button" onClick={() => toggleMobileProfile()}
                                              className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                              aria-controls="disclosure-1" aria-expanded="false">
                  Profile
                  <svg className="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"/>
                  </svg>
                </button>}
                <div className="mt-2 space-y-2" id="disclosure-1" hidden={isMobileProfileOpen}>
                  <button onClick={() => handleLinkClick("/myprofile")}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">My
                    Profile
                  </button>
                  <button onClick={() => handleLinkClick("/myposts")}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">My
                    Posts
                  </button>
                  <button onClick={() => handleLinkClick("/myfavoriteposts")}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Favorite
                    Posts
                  </button>
                  <button onClick={() => handleLinkClick("/myfavoriteauthors")}
                           className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Favorite
                    Authors
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {userInfo && (
            <ProfileDropDown isProfileOpen={isProfileOpen} toggleProfile={toggleProfile}
                             handleLinkClick={handleLinkClick}
                             setIsProfileOpen={setIsProfileOpen}/>
          )}
          {userInfo && <Link to="/authors" className="text-sm font-semibold leading-6 text-gray-900">Authors</Link>}
          <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">About</Link>
          {userInfo &&
            <Link to="/newpost" className="text-sm font-semibold leading-6 text-gray-900">Create the Post</Link>}
        </div>

        {userInfo ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button className="text-sm font-semibold leading-6 text-gray-900" onClick={logoutHandler}> Log out <span
              aria-hidden="true">&rarr;</span></button>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900"> Log in <span
              aria-hidden="true">&rarr;</span></Link>
          </div>
        )}
      </nav>

      <MobileMenu isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu}
                  handleLinkClick={handleLinkClick} logoutHandler={logoutHandler}/>
    </header>
  );
}

export default Header;