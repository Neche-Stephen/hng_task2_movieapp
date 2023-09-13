import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import POSTER from '../../assets/Poster.png';
import TV_LOGO from '../../assets/tv.png';
import MENU from '../../assets/Menu.svg';
import IMDB from '../../assets/IMDB.png';
import ORANGE from '../../assets/orange.png';
import PLAY from '../../assets/Play.svg';



import './Header.css'

export default function () {
  return (
  <header className='header_section'>
         <Container fluid className="container-lg" >
            <Row className='header_nav justify-content-evenly justify-content-between align-items-center'>
                    <Col xs = '4' lg = '2'>
                        <div className='d-flex align-items-center'>
                            <img src={TV_LOGO} alt="TV LOGO" />
                            <span className='header_title ms-4 position-relative'>MovieBox</span>
                        </div>
                    </Col>
                    <Col xs ='6' md = '3' lg = '5'>
                        <input type="text"  className='header_search' placeholder='What do you want to watch?'/>
                    </Col>
                    <Col className='d-none d-md-block'  xs ='5' lg = '2'>
                    <div className='d-flex align-items-center justify-content-end'>
                            <span className=''>Sign in</span>
                            <img src={MENU} alt="Menu" className='header_menu ms-4' />
                    </div>
                    </Col>

            </Row>

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
