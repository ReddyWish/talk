import { Outlet } from 'react-router-dom';
import Header from './components/header/Header.jsx';

function App() {

  return (
    <>
      <Header/>
      <main className='p-20'>
        <Outlet/>
      </main>
    </>
  )
}

export default App
