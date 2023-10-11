import React, { useEffect, useState } from 'react';
import { useGetPostQuery, useUploadPostImageMutation } from "../../slices/postsApiSlice.js";
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import { useUpdatePostMutation } from "../../slices/postsApiSlice.js";
import { useForm } from "react-hook-form";
import Loader from '../../components/Loader.jsx';
import { setCredentials } from "../../slices/authSlice.js";
import { useSelector } from "react-redux";

function EditPostPage(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading, refetch, error } = useGetPostQuery(id);

  const [updatePost] = useUpdatePostMutation();

  const form = useForm();

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const [uploadPostImage, { isLoading: loadingUpload }] = useUploadPostImageMutation();

  const submitHandler = async (data) => {
    try {
      await updatePost({ data, id })
      refetch()
      navigate(`/post/${id}`)
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
    <>
      {isLoading ? (<Loader/>)
        : (
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
            <h2 className="text-2xl text-gray-900">Post editing</h2>

            <div className="flex flex-col rounded  shadow p-6">
              <form className='w-full' onSubmit={handleSubmit(submitHandler)} noValidate>
                <div className='w-full mb-6'>
                  <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Image</label>
                  <div
                    className="w-full">
                    <label htmlFor="file-input-medium" className="sr-only">Choose file</label>
                    <input type="text" placeholder='    Enter image url' id='image' defaultValue={post?.image}
                           {...register('image')}
                           className="border border-gray-400 block w-full shadow-sm text-sm focus:z-10 file:bg-transparent file:bg-gray-100 file:mr-4"/>
                    <input type="file" name="file-input-medium" onChange={uploadFileHandler} id="file-input-medium"
                           className="block w-full border border-gray-400 shadow-sm text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"/>
                  </div>
                </div>

                <div className="pb-6">
                  <label htmlFor="title" className="font-semibold text-gray-700 block pb-1">Title</label>
                  <div>
                    <input id="title" type="text" defaultValue={post?.title}
                           className={`border ${errors.title ? 'border-2 border-red-100' : 'border-gray-400'} px-4 py-2 w-full`}
                           {...register('title', {
                             required: {
                               value: true,
                               message: 'Title can not be empty',
                             }
                           })}/>
                    {errors.title ? <p className='text-xs text-red-400'>{errors.title.message}</p> : ''}
                  </div>
                </div>
                <div className="pb-4">
                  <label htmlFor="content" className="font-semibold text-gray-700 block pb-1">Content</label>
                  <textarea id="content" type='content' defaultValue={post?.content}
                         className={`border ${errors.content ? 'border-2 border-red-100' : 'border-gray-400'} px-4 py-2 w-full textarea-tall`}
                         {...register('content', {
                           required: 'Content can not be empty',
                           message: 'Content can not be empty'
                         })}
                  />
                  {errors.content ? <p className='text-xs text-red-400'>{errors.content.message}</p> : ''}
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
          </div>)}
        </>)
      }

      export default EditPostPage;