import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import axios from 'axios'

import './Login.css'
import image from '../images/pexels-ike-louie-natividad-3310694.jpg'

export default function Login() {

    const history = useHistory()

    

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        
            
    }

    return (
        <div className="login">
            <div className="login__left">
                <h3 className="login__title">Login</h3>
                { error && error }
                <form className="login__form" method="post">
                    <label htmlFor="username" className="form__label">Username</label>
                    <input type="text" className="form__input" name="username" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="password" className="form__label">Password</label>
                    <input type="password" className="form__input" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="form__submit" onClick={(e) => handleSubmit(e)}>Login</button>
                </form>
                <p className="login__registerLink">Don't have an account? <a href="/register">Register.</a></p>
            </div>
            <div className="login__right">
                <img className="right__image" src={image} alt="" />
            </div>
        </div>
    )
}
