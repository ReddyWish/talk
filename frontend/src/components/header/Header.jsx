import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import useOutsideClick from '../../hooks/useOutsideClick.js'
import ProfileDropDown from "./ProfileDropDown.jsx";
import MobileMenu from "./MobileMenu.jsx";
import { Link } from "react-router-dom";

function Header(props) {


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

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


  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img src="/images/logo5.png"
                 className="h-12 w-12 rounded-full mr-2 object-contain" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={() => toggleMobileMenu()}>
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        <ProfileDropDown isProfileOpen={isProfileOpen} toggleProfile={toggleProfile} handleLinkClick={handleLinkClick} setIsProfileOpen={setIsProfileOpen}/>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></Link>
        </div>
      </nav>

      <MobileMenu isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} handleLinkClick={handleLinkClick} />
    </header>
  );
}

export default Header;