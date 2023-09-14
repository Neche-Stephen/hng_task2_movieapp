import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';


import POSTER from '../../assets/Poster.png';
import TV_LOGO from '../../assets/tv.png';
import MENU from '../../assets/Menu.svg';
import IMDB from '../../assets/IMDB.png';
import ORANGE from '../../assets/orange.png';
import PLAY from '../../assets/Play.svg';
import SEARCH from '../../assets/Search.svg';



import './Header.css'
const apiKey = process.env.REACT_APP_TMDB_API_KEY;
export default function () {
  const [alertShow, setAlertShow] = useState(true);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [networkErroMessage, setNetworkErroMessage] = useState(false);


  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
        setQuery('');
        setNetworkErroMessage(false);
    } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
      alert('Your network is unstable');
      setNetworkErroMessage(true);
    } finally {
      setLoading(false);
    }
  };

  return (
  <header className='header_section'>
         <Container fluid className="container-lg position-relative" >
            <Row className='header_nav justify-content-center justify-content-sm-evenly justify-content-lg-between align-items-center'>
                    <Col xs = 'auto' sm = '4' lg = '2'>
                        <div className='d-flex align-items-center'>
                            <img src={TV_LOGO} alt="TV LOGO" />
                            <span className='header_title ms-4 position-relative'>MovieBox</span>
                        </div>
                    </Col>
                    <Col xs ='10' sm = '6' md = '4' lg = '5' className='position-relative mt-3 mt-sm-0'>
                        <input type="text"  className='header_search' placeholder='What do you want to watch?'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        />
                        <img onClick={handleSearch} className='header_search_icon' src={SEARCH} alt="" />
                    </Col>
                    <Col className='d-none d-md-block'  md ='4' lg = '2'>
                    <div className='d-flex align-items-center justify-content-end'>
                            <span className=''>Sign in</span>
                            <img src={MENU} alt="Menu" className='header_menu ms-4' />
                    </div>
                    </Col>

            </Row>

            {loading &&
                <Row className='justify-content-center position-absolute search_spinner'>
                    <Col xs = 'auto'>
                    <Spinner className='' animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                    </Col>
                </Row>
            }

            {
                networkErroMessage &&  
                <Row className='justify-content-center position-absolute w-100 top-25'>
                    <Col xs ='4'>
                    <Alert  variant='warning' onClose={() => setAlertShow(false)} dismissible>
                        Sorry, the movies couldnt be fetched due to network issues, refresh your page to try again
                    </Alert>
                    </Col>
                </Row>
            }
        
              {
                searchResults.length > 0 ? 
                <div className='row justify-content-center justify-content-lg-end search_results_container' dismissible>
                    <div className='search_results_parent col-6 col-lg-8'>
                    <h3>Search Results</h3><span style={{color:'blue', cursor:'pointer'}} onClick={()=>setSearchResults([])}>Close search</span>
                        <div className='row'>
                        {searchResults.map((movie) => (
                            <div className='search_results col-md-6 col-lg-3' key={movie.id}>
                                <Link to={`/movies/${movie.id}`}><img
                                className='img-fluid'
                                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                alt={movie.title}
                                /></Link>
                                <div className=''>
                                        <h2 className='search_result_title'>{movie.title}</h2>
                                        <p className='search_result_release'>{movie.release_date}</p>
                                </div>
                            
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                :
                null
              }
            

            <Row className='justify-content-center justify-content-lg-start align-items-center'>
                <Col xs ='8' lg = '4'>
                    <div><h1 className='header_subtitle'>John Wick 3: Parabellum</h1></div>
                    <div className='d-flex align-items-cente'>
                       <div className='me-4'>
                            <img src={IMDB} alt="" />
                            <span className='header_rating ms-2'>86.0/100</span>
                       </div>
                        <div>
                            <img src = {ORANGE} alt="" />
                            <span className='header_rating ms-2'>97%</span>
                        </div>
                    </div>
                    <div className='w-75 header_subtitle_text mt-3'>
                    John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.
                    </div>
                    <div className='header_subtitle_btn w-50 d-flex mt-3'>
                         <img src={PLAY} alt="" />
                         <span>WATCH TRAILER</span>
                    </div>
                </Col>
            </Row>

   </Container>

  </header>
  )
}
