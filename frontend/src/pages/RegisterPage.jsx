import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal.jsx';
import { useRegistrationMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const [modalOpen, setModalOpen] = useState(true);

  const [registration, { isLoading }] = useRegistrationMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const toggleModal = () => {
    setModalOpen(prev => !prev)
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate]);

  const submitHandler = async (data) => {
      try {
        const res = await registration({ name: data.name, email: data.email, password: data.password }).unwrap();
        dispatch(setCredentials({ ...res }));
        console.log(res)
        navigate('/')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  }

  return (
    <>
      <section className="min-h-screen flex flex-col">
        <div className="flex flex-1 items-center justify-center">
          <div
            className="rounded-lg px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center bg-opacity-50 bg-blur">
            {!!Object.keys(errors).length && <Modal modalOpen={modalOpen} toggleModal={toggleModal} errors={errors}/>}
            <form className="text-center" onSubmit={handleSubmit(submitHandler)} noValidate>
              <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600 w-10">
                Sign Up {' '}
                {!!Object.keys(errors).length && <button
                  onClick={toggleModal}
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  🫤
                </button>}
              </h1>
              <div className="py-2 text-left">
                <input
                  type="text"
                  id='name'
                  {...register('name', {
                    required: {
                      value: true,
                      message: ' - Please mention your name',
                    }
                  })}
                  className={`bg-gray-200 ${errors.name ? 'border-2 border-red-100' : 'border-gray-100'} focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg ${errors.name ? 'border-red-200' : 'border-gray-700'}`}
                  placeholder="Name"
                />
              </div>
              <div className="py-2 text-left">
                <input
                  type="email"
                  id='email'
                  {...register('email', {
                    required: ' - Please mention your email',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: ' - Invalid email'
                    }
                  })}
                  className={`bg-gray-200 ${errors.email ? 'border-2 border-red-100' : 'border-gray-100'} focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg ${errors.email ? 'border-red-200' : 'border-gray-700'}`}
                  placeholder="Email"
                />
              </div>
              <div className="py-2 text-left">
                <input
                  type="password"
                  id='password'
                  {...register('password', {
                    required: ' - Password is required',
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: ' - Password should contain at least one uppercase letter, one digit, one special character and min length should be 8 characters '
                  }
                  })}
                  className={`bg-gray-200 ${errors.password ? 'border-2 border-red-100' : 'border-gray-100'} focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg ${errors.password ? 'border-red-200' : 'border-gray-700'}`}
                  placeholder="Password"
                />
              </div>
              <div className="py-2 text-left">
                <input
                  type="password"
                  id='confirmPassword'
                  {...register('confirmPassword', {
                    required: ' - Confirmation of the password is required',
                    validate: (value) => value === form.getValues().password || ' - Confirmation of the password does not match'
                  })}
                  className={`bg-gray-200 ${errors.confirmPassword ? 'border-2 border-red-100' : 'border-gray-100'} focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg ${errors.confirmPassword ? 'border-red-200' : 'border-gray-700'}`}
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