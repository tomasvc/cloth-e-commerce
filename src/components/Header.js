import React, { useState, useEffect } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BsCart2 } from 'react-icons/bs'

import { useAuth0 } from '@auth0/auth0-react'

import './Header.css'



export default function Header() {
 
    const [user, setUser] = useState()

    return (
        <>
            <div className="header">
                <nav className="header__navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar__left">
                        {/* <div id="icon" className="navbar__icon" onClick={handleMenuClick}>
                        <span className="icon--1"></span>
                        <span className="icon--2"></span>
                        <span className="icon--3"></span>
                        </div> */}
                        <div className="left__brand">
                            <a href="/"><h3 className="brand__name">Cloth</h3></a>
                        </div>
                        <div className="left__input">
                            <input className="input" type="text" placeholder="Search for items and brands" />
                        </div>
                    </div>
                    <div className="navbar__right">
                        <button className="right__cart" onClick={() => !user ? window.location.href = '/login' : window.location.href = '/cart'}>
                            <BsCart2></BsCart2>
                        </button>
                        <button className="right__user" onClick={() => !user ? window.location.href = '/login' : window.locaction.href = '/profile'}>
                            <AiOutlineUser></AiOutlineUser>
                            <div id="user" className="user__user">
                                <a href="/login" className="user__login">{user ? 'Log in' : 'Log out'}</a>
                            </div>
                        </button>    
                    </div> 
                </nav>
            </div>
        </>
    )
}
