import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Container, Row, Col } from 'react-bootstrap';
import './MoviePage.css';
import TV_LOGO from '../../assets/tv.png';
import HOME from '../../assets/Home.png';
import MOVIE_PROJECTOR from '../../assets/Movie_Projector.png';
import TV_SHOW from '../../assets/TV_Show.png';
import CALENDAR from '../../assets/Calendar.png';
import NOT_FAV from '../../assets/favorite.svg';
import FAV from '../../assets/yellow.svg';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

export default function MoviePage() {
   const [isFav, setIsFav] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [movieDetails, setMovieDetails] = useState({});
  const { title, release_date, runtime, overview, poster_path, backdrop_path  } = movieDetails
  const posterUrl = `https://image.tmdb.org/t/p/w500${backdrop_path}`;
  
  const toggleFav = () => {
    setIsFav(!isFav)
  };

  useEffect(()=>{
    fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    setMovieDetails(data);
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
    <>
      <Button variant="primary" className="d-lg-none" onClick={handleShow}>
       View Sidebar
      </Button>

     <Container fluid className=''>
        <Row>
          <Col className='d-none d-lg-block' lg = '2'>
           
             <Offcanvas  className='movie_offcanvas' show={show} onHide={handleClose} responsive="lg">
                <Offcanvas.Body>
                  {/* <div className='d-flex kk align-items-center' >
                      <img className='ms-1' src={TV_LOGO} alt="TV_LOGO" />
                      <span>MovieBox</span>
                  </div> */}
                 <Container fluid>
                  <Row className='offcanvas_logo align-items-center justify-content-evenly mt-5'>
                        <Col xs ='auto' className='p-0'><img className='' src={TV_LOGO} alt="TV_LOGO" /></Col>
                        <Col xs ='auto' className='p-0'> <span>MovieBox</span></Col>
                  </Row>
                  <Row className='offcanvas_row align-items-center justify-content-center mt-5'>
                        <Col xs ='auto' className='p-0 me-4'><img className='' src={HOME} alt="HOME ICON" /></Col>
                        <Col xs ='auto' className='p-0'> <span>Home</span></Col>
                  </Row>
                  <Row className='offcanvas_row align-items-center justify-content-center mt-5'>
                        <Col xs ='auto' className='p-0 me-4'><img className='' src={MOVIE_PROJECTOR} alt="" /></Col>
                        <Col xs ='auto' className='p-0'> <span>Movies</span></Col>
                  </Row>
                  <Row className='offcanvas_row align-items-center justify-content-center mt-5'>
                        <Col xs ='auto' className='p-0 me-4'><img className='' src={TV_SHOW} alt="" /></Col>
                        <Col xs ='auto' className='p-0'> <span>TV Series</span></Col>
                  </Row>
                  <Row className='offcanvas_row align-items-center justify-content-center mt-5'>
                        <Col xs ='auto' className='p-0 me-4'><img className='' src={CALENDAR} alt="" /></Col>
                        <Col xs ='auto' className='p-0'> <span>Upcoming</span></Col>
                  </Row>
                 </Container>
                </Offcanvas.Body>
              </Offcanvas>
           
          </Col>
          {
            spinner ? 
              <Col>
              <Row className='justify-content-center mt-5'>
                  <Col xs ='auto'>
                    <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  </Col>
              </Row>
              </Col>
            :
           loaded ?
           <Col xs ='12' lg = '8' >
            <Row className='mt-5'>
                <Col>
                    <div style={{backgroundImage:`url(${posterUrl})`}} className='movie_img'>
                        
                    </div>
                </Col>
            </Row>
            <Row>
              <Col>
                <div className='d-flex justify-content-between mb-3'>
                    <span data-testid = 'movie-title' className='movie_title'> {title}</span>
                    <span data-testid = 'movie-release-date' className='movie_date'> {release_date}</span>
                    <span data-testid = 'movie-runtime' className='movie_runtime'>{runtime} minutes</span>
                    <span><img onClick= {toggleFav} src={isFav ? FAV:NOT_FAV} className = 'w-100' alt="" /></span>
                    {/* <span>{utcDateStr}</span> */}
                </div>
              </Col>
            </Row>
            <Row>
                <Col>
                  <p data-testid = 'movie-overview'>{overview}</p>
                </Col>
            </Row>
           </Col>
          :
          <Col>
            <Alert  variant='warning' className='mt-5'>
            Sorry, the movie details couldnt be fetched due to network issues, refresh your page to try again
          </Alert>
          </Col>
          }
        </Row>
     </Container>
    </>
  )
}
