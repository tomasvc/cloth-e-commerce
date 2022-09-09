import React, { useState, SyntheticEvent } from 'react'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { createUserDocumentFromAuth } from '../../utils/firebase' 

import './styles.css'

import image from '../../assets/images/pexels-ike-louie-natividad-3310694.jpg'

export default function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [userRegistered, setUserRegistered] = useState(false)

        const auth = getAuth();
        
        const handleSubmit = (e: SyntheticEvent<HTMLElement>) => {
            e.preventDefault()
            createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
                const user = userCredential.user
                console.log(user)
                console.log(auth.currentUser)
            }).then(() => {
                auth.currentUser &&
                    createUserDocumentFromAuth(auth.currentUser)
                    setUserRegistered(true)
            })
            .catch(error => {
                const errorCode = error.code
                const errorMessage = error.message
            })
        }

    return (
        <div className="register">
            <div className="register__left">
                <h3 className="register__title">Register</h3>
                {userRegistered ? (
                    <p className="register__verification">A verification link has been sent to <b>{email}</b></p>
                ) : (
                    <form className="register__form" onSubmit={handleSubmit}>
                        <label htmlFor="name" className="form__label">Name</label>
                        <input type="text" className="form__input" name="name" placeholder="Name" required onChange={(e) => setName(e.target.value)}/>

                        <label htmlFor="email" className="form__label">Email</label>
                        <input type="email" className="form__input" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>

                        <label htmlFor="password1" className="form__label">Password</label>
                        <input type="password" className="form__input" name="password1" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>

                        <label htmlFor="password2" className="form__label">Confirm Password</label>
                        <input type="password" className="form__input" name="password2" placeholder="Confirm password" required/>

                        <button type="submit" className="form__submit">Register</button>
                    </form>
                )}
                <p className="login__registerLink">Already have an account? <a href="/login">Login.</a></p>
            </div>
            <div className="register__right">
                <img className="right__image" src={image} alt="" />
            </div>
        </div>
    )
}
