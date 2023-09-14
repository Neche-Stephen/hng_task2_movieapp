import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import './Main.css';
import FeaturedMovie from '../featured_movie/FeaturedMovie';
import CHEVRON_RIGHT from '../../assets/Chevron_right.svg';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

export default function Main() {

  const [moviesData, setMoviesData] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [loaded, setLoaded] = useState(false);


  useEffect(()=>{
    fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    setMoviesData(data.results)
    setSpinner(false);
    setLoaded(true);
  })
  .catch((error) => {
    if (error.type === 'network') {
      console.log('Network error:', error.message);
      setSpinner(false);
      setLoaded(false);
    }
    else if (error.message === 'Failed to fetch'){
      setTimeout(() => {
        alert('Your network is unstable')
      }, 1000);
      setSpinner(false);
      setLoaded(false);
    }
    else {
      console.log('Other error:', error.message);
      setSpinner(false);
      setLoaded(false);
    }
  });
  }, [])
  return (
    <main className='main_section mt-5'>
        <Container>
            <Row>
                <Col>
                    <div className='d-flex justify-content-between'>
                        <h3 className='main_title'>Featured Movies</h3>
                        <p className='main_see_more'>See more <img src={CHEVRON_RIGHT} alt="" /></p>
                    </div>
                </Col>
            </Row>
            <Row>
               {spinner ?
               <Container>
                <Row className='justify-content-center mb-5 mt-3'>
                  <Col xs ='auto'>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  </Col>
                </Row>
               </Container>:
                loaded ? 
                moviesData.slice(0, 10).map((movie, index) => {
                  return  <FeaturedMovie movie  = {movie}  key={index} index = {index} />
                })
                :
                <Alert  variant='warning'>
                  Sorry, the movies couldnt be fetched due to network issues, refresh your page to try again
                </Alert>
               }
            </Row>
        </Container>

    </main>
  )
}
