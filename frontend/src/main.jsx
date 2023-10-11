import React from 'react'
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx'
import './index.css'
import UsersListPage from './pages/users/UsersListPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import ContactPage from './pages/ContactPage.jsx';
import MyFavoritePosts from './pages/posts/MyFavoritePosts.jsx';
import MyPosts from './pages/posts/MyPosts.jsx';
import PostPage from './pages/posts/PostPage.jsx';
import MyProfilePage from './pages/users/MyProfilePage.jsx';
import MyFavoriteAuthorsPage from './pages/users/MyFavoriteAuthorsPage.jsx';
import CreatePostPage from './pages/posts/CreatePostPage.jsx';
import UsersProfilePage from './pages/users/UsersProfilePage.jsx';
import EditMyProfilePage from './pages/users/EditMyProfilePage.jsx';
import EditPostPage from './pages/posts/EditPostPage.jsx';
import UsersPosts from "./pages/posts/UsersPosts.jsx";
import EditUsersProfilePage from "./pages/users/EditUsersProfilePage.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomePage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/authors' element={<UsersListPage/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
      <Route path='/post/:postId' element={<PostPage/>}/>

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/myprofile' element={<MyProfilePage/>}/>
        <Route path='/profile/:id' element={<UsersProfilePage/>}/>
        <Route path='/editmyprofile' element={<EditMyProfilePage/>}/>
        <Route path='/editpost/:id' element={<EditPostPage/>}/>
        <Route path='/myposts' element={<MyPosts/>}/>
        <Route path='/posts/:id' element={<UsersPosts/>}/>
        <Route path='/newpost' element={<CreatePostPage/>}/>
        <Route path='/myfavoriteposts' element={<MyFavoritePosts/>}/>
        <Route path='/myfavoriteauthors' element={<MyFavoriteAuthorsPage/>}/>
      </Route>

      <Route path='' element={<AdminRoute/>}>
        <Route path='/updateuser/:id' element={<EditUsersProfilePage/>}/>
      </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
