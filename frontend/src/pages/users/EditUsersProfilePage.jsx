import React, { useEffect, useState } from 'react';
import { useUploadPostImageMutation } from "../../slices/postsApiSlice.js";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Loader from "../../components/Loader.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { useGetUserByIdQuery, useUpdateUserProfileByIdMutation } from "../../slices/usersApiSlice.js";
import { useForm } from "react-hook-form";

function EditUsersProfilePage(props) {
  const { id } = useParams();
  // const { data: user, isLoading } = useGetUserByIdQuery(id);
  const [countries, setCountries] = useState([]);
  const location = useLocation();
  const { user } = location.state || {};

  useEffect(() => {
    const getCountries = async () => {
      try {
        const { data } = await axios.get('https://restcountries.com/v3.1/independent?status=true');
        setCountries(data)
      } catch (err) {
        console.log(err)
      }
    }
    getCountries()
  }, []);

  const navigate = useNavigate();
  const [updateUserProfileById, { isLoading: loadingUpdateUserProfile }] = useUpdateUserProfileByIdMutation();
  const form = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      description: user?.description || '',
      profession: user?.profession || '',
      country: user?.country || '',
    }
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const [uploadPostImage, { isLoading: loadingUpload }] = useUploadPostImageMutation();

  const toggleModal = () => {
    setModalOpen(prev => !prev)
  }

  const submitHandler = async (data) => {
    try {
      const res = await updateUserProfileById({ data, id }).unwrap();
      navigate(`/profile/${id}`)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadPostImage(formData).unwrap();
      toast.success(res.message);
      setValue('image', res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }


  return (
    <div className="inputs w-full max-w-2xl p-6 mx-auto">
      <h2 className="text-2xl text-gray-900">Profile Setting</h2>

        <div className="flex flex-col rounded  shadow p-6">
        <form className='w-full' onSubmit={handleSubmit(submitHandler)} noValidate>
          <div className='w-full mb-6'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>avatar</label>
            <div
              className="w-full">
              <label htmlFor="file-input-medium" className="sr-only">Choose file</label>
              <input type="text" placeholder='    Enter image url' id='image'
                     {...register('image')}
                     className="border border-gray-400 block w-full shadow-sm text-sm focus:z-10 file:bg-transparent file:bg-gray-100 file:mr-4"/>
              <input type="file" name="file-input-medium" onChange={uploadFileHandler} id="file-input-medium"
                     className="block w-full border border-gray-400 shadow-sm text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"/>
            </div>
          </div>

          <div className="pb-6">
            <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">Name</label>
            <div>
              <input id="name" type="text"
                     className={`border ${errors.name ? 'border-2 border-red-100' : 'border-gray-400'} px-4 py-2 w-full`}
                     {...register('name', {
                       required: {
                         value: true,
                         message: 'Please mention your name',
                       }
                     })}/>
              {errors.name ? <p className='text-xs text-red-400'>{errors.name.message}</p> : ''}
            </div>
          </div>
          <div className="pb-4">
            <label htmlFor="email" className="font-semibold text-gray-700 block pb-1">Email</label>
            <input id="email" type='email'
                   className={`border ${errors.email ? 'border-2 border-red-100' : 'border-gray-400'} px-4 py-2 w-full`}
                   {...register('email', {
                     required: 'Please mention your email',
                     pattern: {
                       value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                       message: 'Invalid email'
                     }
                   })}
            />
            {errors.email ? <p className='text-xs text-red-400'>{errors.email.message}</p> : ''}
          </div>
          <div className="pb-4">
            <label htmlFor="profession" className="font-semibold text-gray-700 block pb-1">Profession</label>
            <input id="profession" className="border border-gray-400 px-4 py-2 w-full" type="text"
                   {...register('profession')}/>
          </div>
          <div className="pb-4">
            <label htmlFor="country" className="font-semibold text-gray-700 block pb-1">Country</label>
            <select name="country" id="country"
                    className="border border-gray-400 px-4 py-2 w-full" {...register('country')}>
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country?.name.common} value={country?.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>
          <div className="pb-4">
            <label htmlFor="password" className="font-semibold text-gray-700 block pb-1">Password</label>
            <input id="password"
                   className={`border ${errors.password ? 'border-2 border-red-100' : 'border-gray-400'} px-4 py-2 w-full`}
                   type="password"
                   {...register('password', {
                     required: 'Password is required',
                     pattern: {
                       value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                       message: 'Password should contain at least one uppercase letter, one digit, one special character and min length should be 8 characters '
                     }
                   })} />
            {errors.password ? <p className='text-xs text-red-400'>{errors.password.message}</p> : ''}
          </div>

          <div className="pb-4">
            <label htmlFor="description" className="font-semibold text-gray-700 block pb-1">Description <span
              className='font-light text-xs'>(Write a brief intro about yourself or your motto)</span></label>
            <input id="description" className="border border-gray-400 px-4 py-2 w-full" type="text"
                   {...register('description')} />
          </div>
          <div className="py-2">
            <button
              type="submit"
              className="border-2 border-gray-100 focus:outline-none bg-slate-700 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-slate-800"
            >
              Apply changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUsersProfilePage;