import { HashRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.scss';
import List from './component/List';
import Movies from './component/Movies';
import TvSeries from './component/TvSeries';

function App() {

  return (
    <HashRouter>
      <header>
        <NavLink to="/"activeClassName="active">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/tvSeries">TV Series</NavLink>
      </header>

      <main>he Shawshank Redemption
      
      The Godfather Part II
      
        <Routes>
          <Route path='/' element={<List/>} />
          <Route path='/movies' element={<Movies/>}/>
          <Route path='/tvSeries'element={<TvSeries/>}/>
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
