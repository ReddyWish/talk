import React, { useState } from 'react';
import { useSelector } from "react-redux";

function MobileMenu({ isMobileMenuOpen, toggleMobileMenu, handleLinkClick, logoutHandler }) {
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);

  const toggleMobileProfile = () => {
    setIsMobileProfileOpen(prev => !prev)
  }

  return (
    <div className='lg:hidden' role="dialog" aria-modal="true" hidden={isMobileMenuOpen}>

      <div className="fixed inset-0 z-10"></div>
      <div
        className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            {/*<img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""/>*/}
          </a>
          <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => toggleMobileMenu()}>
            <span className="sr-only">Close menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                 aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {/*<button type="button"*/}
              {/*        className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
              {/*        aria-controls="disclosure-1" aria-expanded="false">*/}
              {/*  Posts*/}
              {/*</button>*/}


              {/*....*/}
              {userInfo && <div className="space-y-2 py-6">
                <div className="-mx-3">
                  <button type="button" onClick={() => toggleMobileProfile()}
                          className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          aria-controls="disclosure-1" aria-expanded="false">
                    Profile
                    <svg className="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"/>
                    </svg>
                  </button>
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
              </div>}
              {/*....*/}
              {/*<button onClick={() => handleLinkClick("/")} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Posts</button>*/}

              {userInfo && <button onClick={() => handleLinkClick("/authors")}
                       className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Authors
              </button>}
              <button onClick={() => handleLinkClick('/about')}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">About
              </button>
              {userInfo && <button onClick={() => handleLinkClick("/newpost")}
                       className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Create
                the Post
              </button>}
            </div>
            {userInfo ? (
                <div className="py-6">
                  <button onClick={logoutHandler}
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log
                    out
                  </button>
                </div>
            ) : (
              <div className="py-6">
                <button onClick={() => handleLinkClick("/login")}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log
                  in
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;