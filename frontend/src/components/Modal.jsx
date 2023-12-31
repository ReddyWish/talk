import React from 'react';

function Modal({ modalOpen, toggleModal, errors }) {
  return (
    <div className='bg-blue-200 text-gray-700 rounded-md mb-5 opacity-80' hidden={modalOpen}>
      <div className='text-xs p-3 text-center'>
        <p>{errors.name?.message}</p>
        <p>{errors.email?.message}</p>
        <p>{errors.password?.message}</p>
        <p>{errors.confirmPassword?.message}</p>
        {/*<p>  Name should contain at least 2 letters</p>*/}
        {/*<p>  Name is taken</p>*/}
        {/*<p>  Email is invalid</p>*/}
        {/*<p>  Password should contain at list 8 characters</p>*/}
        {/*<p>  Password does not match</p>*/}
      </div>
    </div>
  );
}

export default Modal;