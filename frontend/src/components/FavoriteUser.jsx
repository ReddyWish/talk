import React from 'react';
import { Link } from 'react-router-dom';

function FavoriteUser({ favoriteUser }) {
  return (

    <div className="bg-white font-sans h-screen w-full flex flex-row justify-center items-center">
      <Link to={`/profile/${favoriteUser._id}`}>
      <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
        <img className="w-32 h-32 mx-auto rounded-full object-cover -mt-20 border-8 border-white" src={favoriteUser?.avatar ? favoriteUser?.avatar : '/images/unknownuser.jpg'} alt="avatar" />
          <div className="text-center mt-2 text-3xl font-medium">{favoriteUser?.name}</div>
          <div className="text-center mt-2 font-light text-sm">{favoriteUser?.country}</div>
          <div className="text-center font-normal text-lg">{favoriteUser?.profession}</div>
          <div className="px-6 text-center mt-2 font-light text-sm">
            <p>
              {favoriteUser.description}
            </p>
          </div>
      </div>
      </Link>
    </div>
  );
}

export default FavoriteUser;