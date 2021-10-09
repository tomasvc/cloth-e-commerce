import React from 'react'

import image from '../images/pexels-harsh-kushwaha-1689731.jpg'
import './Home.css'

export default function Home() {
    return (
        <div className="home">
          <div className="home__left">
            <h2 className="left__greeting">New collection. 2021.</h2>
            <button className="left__button" onClick={() => document.location.href = '/products'}>Browse Catalog</button>
          </div>
          <div className="home__right">
            <img src={image} className="right__image" alt="..." />
          </div>
        </div>
    )
}
