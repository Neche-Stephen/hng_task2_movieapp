import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './routes/home_page/HomePage';
import MoviePage from './routes/movie_page/MoviePage';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<HomePage />}/>
        <Route path="/movies/:id" element = {<MoviePage />}/>
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
