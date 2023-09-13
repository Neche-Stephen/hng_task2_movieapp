import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function FeaturedMovie({movie, index}) {
  const { id, poster_path, title, release_date  } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  return (
    <Col md = '6' lg ='3' className='mb-5'>
        <div className='card' data-testid = 'movie-card'>
            <Link to={`/movies/${id}`}><img src={posterUrl} alt="" className='card-img-top' data-testid = 'movie-poster' /></Link>
            <div className='card-body'>
                <p className='card-title' data-testid = 'movie-title'>{title}</p>
                <p className='card-text' data-testid = 'movie-release-date'>{release_date}</p>
            </div>
        </div>
    </Col>
  )
}
