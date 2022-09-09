import React from 'react'

import image from '../../assets/images/pexels-harsh-kushwaha-1689731.jpg'
import './styles.css'

export default function Home() {
    return (
        <div className="home">
          <div className="home__left">
            <h2 className="left__greeting">New collection. 2022.</h2>
            <button className="left__button" onClick={() => document.location.href = '/products'}>Browse Store</button>
          </div>
          <div className="home__right">
            <img src={image} className="right__image" alt="..." />
          </div>
        </div>
    )
}