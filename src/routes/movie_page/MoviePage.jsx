import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';


import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Container, Row, Col } from 'react-bootstrap';
import './MoviePage.css';
import TV_LOGO from '../../assets/tv.png';
import HOME from '../../assets/Home.png';
import LOGOUT from '../../assets/Logout.png';
import MOVIE_PROJECTOR from '../../assets/Movie_Projector.png';
import TV_SHOW from '../../assets/TV_Show.png';
import CALENDAR from '../../assets/Calendar.png';



// import { useScrollRestoration } from 'react-router-dom';

// function ScrollToTop() {
//   const scrollRestoration = useScrollRestoration();

//   // Disable scroll restoration
//   scrollRestoration.scrollToTop = () => {};

//   return null;
// }



const apiKey = process.env.REACT_APP_TMDB_API_KEY;
export default function MoviePage() {
  const { id } = useParams();
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [movieDetails, setMovieDetails] = useState({});
  const { title, release_date, runtime, overview, poster_path, backdrop_path  } = movieDetails
  const posterUrl = `https://image.tmdb.org/t/p/w500${backdrop_path}`;
  // // Parse the input date string and create a Date object
  // const inputDate = new Date(release_date);
  // // Convert the date to UTC by using toISOString()
  // const utcDateStr = inputDate.toISOString();

  

  useEffect(()=>{
    fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    // Handle the movie data here
    console.log(data)
    setMovieDetails(data);
  })
  .catch((error) => {
    // Handle errors here
  });
  }, [])

  return (
    <>
      <Button variant="primary" className="d-lg-none" onClick={handleShow}>
        Launch
      </Button>

     <Container fluid className=''>
        <Row>
          <Col xs = '2'>
           
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
          <Col xs ='7' >
              <Row className='mt-5'>
                  <Col>
                      <div style={{backgroundImage:`url(${posterUrl})`}} className='movie_img'>
                          
                      </div>
                  </Col>
              </Row>
              <Row>
                <Col>
                  <div className='d-flex justify-content-between'>
                      <span data-testid = 'movie-title'>Title:{title}</span>
                      <span data-testid = 'movie-release-date'>Release Date: {release_date}</span>
                      <span data-testid = 'movie-runtime'>Runtime: {runtime} minutes</span>
                      {/* <span>{utcDateStr}</span> */}
                  </div>
                </Col>
              </Row>
              <Row>
                  <Col>
                    <p data-testid = 'movie-overview'>After thirty years, Maverick is still pushing the envelope as a top naval aviator but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.</p>
                  </Col>
              </Row>
          </Col>
        </Row>
     </Container>
    </>
  )
}
