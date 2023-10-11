import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoClose } from "react-icons/io5";
import { useCreatePostMutation, useUploadPostImageMutation } from "../../slices/postsApiSlice.js";

function CreatePostPage(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  const [createPost, { isLoading }] = useCreatePostMutation();
  const [uploadPostImage, { isLoading: loadingUpload }] = useUploadPostImageMutation();

  const createPostHandler = async () => {
    try {
      const res = await createPost({
        title,
        content,
        image
      }).unwrap();
      toast.success('Post created');
      navigate('/');
    } catch (err) {
      toast.error(error)
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadPostImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>

      <div
        className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 shadow-md max-w-2xl mb-5">
        <form>
          <label htmlFor="file-input-medium" className="sr-only">Choose file</label>
          <input type="text" placeholder='    Enter image url' value={image} onChange={(e) => setImage(e.target.value)}
                 className="block w-full border border-gray-200 shadow-sm text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500
    file:bg-transparent
    file:bg-gray-100 file:mr-4
    "/>
          <input type="file" name="file-input-medium" onChange={uploadFileHandler} id="file-input-medium" className="block w-full border border-gray-200 shadow-sm text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500
    file:bg-transparent file:border-0
    file:bg-gray-100 file:mr-4
    file:py-3 file:px-4"/>
        </form>
      </div>

      <div
        className="editor rounded-lg mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none rounded-lg"
          spellCheck="false"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none rounded-lg"
          spellCheck="false"
          placeholder="Describe everything about this post here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="icons flex text-gray-500 m-2">

        </div>
        <div className="buttons flex">
          {/*<div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancel</div>*/}
          <button onClick={createPostHandler} className={`border-2 focus:outline-none font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-slate-800
    ${!title || !content ? 'opacity-50 cursor-not-allowed bg-gray-400 text-gray-700 border-gray-400' : 'border-gray-100 bg-slate-700 text-white hover:bg-slate-800'}`}>Post
          </button>
        </div>
      </div>
    </>
  );
}

export default CreatePostPage;
