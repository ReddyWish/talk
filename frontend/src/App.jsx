import { Outlet } from 'react-router-dom';
import Header from './components/header/Header.jsx';

function App() {

  return (
    <>
      <Header/>
      <main className='px-4 sm:px-20 py-4 sm:py-10 mx-4 sm:mx-20"'>
        <Outlet/>
      </main>
    </>
  )
}

export default App
