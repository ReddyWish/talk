import { Outlet } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Header/>
      <main className='px-4 sm:px-20 py-4 sm:py-10 mx-4 sm:mx-20"'>
        <Outlet/>
      </main>
      <ToastContainer/>
    </>
  )
}

export default App
