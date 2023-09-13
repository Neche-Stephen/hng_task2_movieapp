import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './Main.css';

import FeaturedMovie from '../featured_movie/FeaturedMovie';
import CHEVRON_RIGHT from '../../assets/Chevron_right.svg';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

export default function Main() {

  const [moviesData, setMoviesData] = useState([])

  useEffect(()=>{
    fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    setMoviesData(data.results)
  })
  .catch((error) => {
    // Handle errors here
    console.log(error);
  });
  }, [])
  return (
    <main className='main_section mt-5'>
        <Container>
            <Row>
                <Col>
                    <div className='d-flex justify-content-between'>
                        <h3 className='main_title'>Featured Movie</h3>
                        <p className='main_see_more'>See more <img src={CHEVRON_RIGHT} alt="" /></p>
                    </div>
                </Col>
            </Row>
            <Row>
               {
                moviesData.map((movie, index) => {
                 return  <FeaturedMovie movie  = {movie}  key={index} index = {index} />
                })
               }
            </Row>
        </Container>

    </main>
  )
}
