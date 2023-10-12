import React from 'react';
import { Link } from 'react-router-dom';

function Paginate({ pages, page, keyword = '' }) {
  return (
    pages > 1 && (
      <nav>
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <Link to={`/page/${page - 1}`} className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
              <span className="sr-only">Previous</span>
              <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
              </svg>
            </Link>
          </li>
          {
            pages > 1 && (
              [ ...Array(pages).keys() ].map((x) => (
                <li key={x + 1}>
                  <Link to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${x + 1 === page ? 'bg-gray-100 text-gray-700' : 'bg-white'}`}>
                    { x + 1 }
                  </Link>
                </li>
              ))
            )
          }

          <li>
            <Link to={`/page/${page + 1}`} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
              <span className="sr-only">Next</span>
              <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    )
  );
}

export default Paginate;