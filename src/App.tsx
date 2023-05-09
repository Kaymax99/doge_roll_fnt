import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/app.scss';
import { Route, Routes } from 'react-router-dom';
import { GamePage } from './components/GamePage';
import { CustomNavbar } from './components/CustomNavbar';
import { LoginAndRegistration } from './components/LoginAndRegistration';

export type AccountData = {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
}
export type LoginData = {
  username: string;
  password: string;
}

function App() {

  return (
    <>
      <CustomNavbar/>
      <Routes>
        <Route path='/' element={<h1>Hi</h1>} />
        <Route path='/account/login' element={<LoginAndRegistration/>} />
        <Route path='/account/register' element={<LoginAndRegistration/>} />
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
    </>
  )
}

export default App
