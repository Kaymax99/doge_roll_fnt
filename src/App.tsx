import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/app.scss';
import { Route, Routes } from 'react-router-dom';
import { GamePage } from './components/GamePage';
import { CustomNavbar } from './components/CustomNavbar';


function App() {

  return (
    <>
      <CustomNavbar/>
      <Routes>
        <Route path='/' element={<h1>Hi</h1>} />
        <Route path='/register' element={<h1>Register pls</h1>} />
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
    </>
  )
}

export default App
