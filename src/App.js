import { HashRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.scss';
import List from './component/List';
import Movies from './component/Movies';
import TvSeries from './component/TvSeries';
import Detail from './component/Detail';

function App() {

  return (
    <HashRouter>
      <header>
        <NavLink to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/tvSeries">TV Series</NavLink>
        {/* <NavLink to="/detail">Detail Test</NavLink> */}
      </header>

      <main>      
        <Routes>
          <Route path='/' element={<List/>} />
          <Route path='/movies' element={<Movies/>}/>
          <Route path='/tvSeries'element={<TvSeries/>}/>
          {/* <Route path='/detail/:type/:id'element={<Detail/>}/> */}
          <Route path='/:type/:id'element={<Detail/>}/>
        </Routes>
      </main>
    </HashRouter>
  );
}
export default App;
