import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register() {

    const auth = getAuth()

    return (
        <div className="register">
            <h3 className="register__title">Register</h3>
            <form className="register__form">
                <label for="name" className="form__label">Name</label>
                <input type="text" className="form__input" name="name" placeholder="Name" required/>

                <label for="email" className="form__label">Email</label>
                <input type="email" className="form__input" name="email" placeholder="Email" required/>

                <label for="password1" className="form__label">Password</label>
                <input type="password" className="form__input" name="password1" placeholder="Email" required/>

                <label for="password2" className="form__label">Confirm Password</label>
                <input type="password" className="form__input" name="password2" placeholder="Password" required/>

                <button type="submit" className="form__submit">Register</button>
            </form>
            <p className="login__registerLink">Already have an account? <a href="/login">Login.</a></p>
        </div>
    )
}
