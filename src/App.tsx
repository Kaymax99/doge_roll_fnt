import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/app.scss';
import { Route, Routes } from 'react-router-dom';
import { GamePage } from './components/GamePage';
import { LoginAndRegistration } from './components/LoginAndRegistration';
import { Home } from './components/Home';
import { WithoutNavbarAndFooter } from './components/navHandling/WithoutNavbarAndFooter';
import { WithNavbarAndFooter } from './components/navHandling/WithNavbarAndFooter';
import { MyGames } from './components/MyGames';
import { GameDetails } from './components/GameDetails';
import { ProfilePage } from './components/ProfilePage';

function App() {

  return (
    <>
      <Routes>
        <Route element={<WithNavbarAndFooter/>}>
            <Route path='/' element={<Home/>} />
            <Route path='/account/login' element={<LoginAndRegistration/>} />
            <Route path='/account/register' element={<LoginAndRegistration/>} />
            <Route path='/campaigns/search' element={<MyGames/>} />
            <Route path='/campaigns/details/:campaignId' element={<GameDetails/>} />
            <Route path='/users/:id' element={<ProfilePage/>} />
            <Route path='*' element={<h1>Not found</h1>} />
        </Route>
        <Route element={<WithoutNavbarAndFooter/>}>
          <Route path='/game/editor/:gameId' element={<GamePage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
