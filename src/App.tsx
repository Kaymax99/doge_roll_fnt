import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/app.scss';
import { Route, Routes } from 'react-router-dom';
import { GamePage } from './components/GamePage';
import { LoginAndRegistration } from './components/LoginAndRegistration';
import { Home } from './components/Home';
import { WithoutNavbar } from './components/navHandling/WithoutNavbar';
import { WithNavbar } from './components/navHandling/WithNavbar';
import { MyGames } from './components/MyGames';
import { GameDetails } from './components/GameDetails';

function App() {

  return (
    <>
      <Routes>
        <Route element={<WithNavbar/>}>
          <Route path='/' element={<Home/>} />
          <Route path='/account/login' element={<LoginAndRegistration/>} />
          <Route path='/account/register' element={<LoginAndRegistration/>} />
          <Route path='/campaigns/search' element={<MyGames/>} />
          <Route path='/campaigns/details/:campaignId' element={<GameDetails/>} />
          <Route path='*' element={<h1>Not found</h1>} />
        </Route>
        <Route element={<WithoutNavbar/>}>
          <Route path='/game/editor/:gameId' element={<GamePage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
