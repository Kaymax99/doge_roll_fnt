import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/app.scss';
import { Route, Routes } from 'react-router-dom';
import { GamePage } from './components/GamePage';
import { CustomNavbar } from './components/CustomNavbar';
import { LoginAndRegistration } from './components/LoginAndRegistration';
import { Home } from './components/Home';

export interface IAccountData {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserData {
  name: string;
  surname: string;
  username: string;
  email: string;
  accessToken: string;
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
        <Route path='/' element={<Home/>} />
        <Route path='/account/login' element={<LoginAndRegistration/>} />
        <Route path='/account/register' element={<LoginAndRegistration/>} />
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
    </>
  )
}

export default App
