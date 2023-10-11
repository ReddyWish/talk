import { format } from "date-fns";
import React, { useRef, useState } from "react";
import { useDeletePostCommentMutation, useEditPostCommentMutation } from '../slices/postsApiSlice.js';
import useOutsideClick from "../hooks/useOutsideClick.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetUserByIdQuery } from "../slices/usersApiSlice.js";

function Comment({ comment, isOpen, onOpen, onClose, postId, refetchPost }) {
  const ref = useRef();
  const commentId = comment._id
  const [isDropDownOpen, setIsDropdownOpen] = useState(isOpen);
  const { userInfo } = useSelector((state) => state.auth);
  const [openInput, setOpenInput] = useState(false);
  const [inputComment, setInputComment] = useState(comment.comment);

  const { data: user, isLoading: userLoading, error: userError } = useGetUserByIdQuery(comment.user);

  const [deletePostComment] = useDeletePostCommentMutation();
  const [editPostComment] = useEditPostCommentMutation();

  const handleOpenInput = () => {
    setOpenInput(prev => !prev)
  }

  useOutsideClick(ref, () => {
    if (isDropDownOpen) {
      onClose();
      setIsDropdownOpen(false)
    }
  });

  const triggerCommentsSettings = () => {
    if (isDropDownOpen) {
      onClose()
    } else {
      onOpen(commentId)
    }
    setIsDropdownOpen(prev => !prev)
  }

  const handleDeletePostComment = async () => {
    try {
      await deletePostComment({ commentId, postId }).unwrap();
      refetchPost()
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const handleEditPostComment = async () => {
    try {
      await editPostComment({ inputComment, commentId, postId }).unwrap();
      refetchPost();
      handleOpenInput();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const formattedDate = format(new Date(comment?.createdAt), 'MMMM dd, yyyy');
  return (
    <article className="p-6 text-base bg-white rounded-lg ">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full object-cover"
              src={user?.avatar || '/images/unknownuser.jpg'}
              alt='avatar'
            />{user?.name}</p>
          <p className="text-sm text-gray-600 ">
            <time dateTime={formattedDate} title="February 8th, 2022">{formattedDate}</time>
          </p>
        </div>
        { userInfo ? ((comment.user === userInfo._id || userInfo.isAdmin) && <div className='relative'>
        <button onClick={triggerCommentsSettings} ref={ref}
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                type="button">
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
               viewBox="0 0 16 3">
            <path
              d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
        {/* Dropdown menu */}
        <div id="dropdownComment1"
             className={`${!isDropDownOpen ? 'hidden' : 'absolute left-7'} z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow `}>
          <ul className="py-1 text-sm text-gray-700 "
              aria-labelledby="dropdownMenuIconHorizontalButton">
            <li>
              <button onClick={handleOpenInput}
                 className="block py-2 px-4 hover:bg-gray-100 w-full">Edit</button>
            </li>
            <li>
              <button onClick={handleDeletePostComment}
                 className="block py-2 px-4 hover:bg-gray-100 w-full">Remove</button>
            </li>
          </ul>
        </div>
        </div>) : <div></div>}
      </footer>
      { !openInput ? (<p className="text-xs">{comment?.comment}</p>)
        : (
      <div>
        <label htmlFor="title" className="font-semibold text-gray-700 block pb-1"></label>
        <div>
          <input id="title" type="text" value={inputComment} onChange={(e) => setInputComment(e.target.value)}
                 className={`border rounded-lg mb-1 text-xs ${inputComment === '' ? 'border-2 border-red-100' : 'border-gray-400'} px-2 py-2 w-full`}
                 />
        </div>
        <button onClick={handleEditPostComment} disabled={inputComment === ''} className={`border-2 focus:outline-none font-bold tracking-wider block w-full rounded-lg focus:border-gray-700 text-xs p-1 hover:bg-slate-800
    ${(inputComment === '') ? 'opacity-50 cursor-not-allowed bg-gray-400 text-gray-700 border-gray-400' : 'border-gray-100 bg-slate-700 text-white hover:bg-slate-800'}`}>Apply changes
        </button>
      </div>
        )
}
    </article>
  )
}

export default Comment;