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
import UsersList from './pages/users/UsersList.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import MyFavoritePosts from "./pages/posts/MyFavoritePosts.jsx";
import MyPosts from './pages/posts/MyPosts.jsx';
import PostPage from './pages/posts/PostPage.jsx';
import MyProfile from './pages/users/MyProfile.jsx';
import MyFavoriteAuthors from './pages/users/MyFavoriteAuthors.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomePage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/authors' element={<UsersList/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
      <Route path='/myprofile' element={<MyProfile/>}/>
      <Route path='/myposts' element={<MyPosts/>}/>
      <Route path='/post/:postId' element={<PostPage/>}/>
      <Route path='/myfavoriteposts' element={<MyFavoritePosts/>}/>
      <Route path='/myfavoriteauthors' element={<MyFavoriteAuthors/>}/>
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
