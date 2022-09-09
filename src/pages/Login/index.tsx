import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { userLogin } from '../../slices/userSlice'
import { auth, signInWithGooglePopup } from '../../utils/firebase'
import { RootState } from '../../store'
import './styles.css'
import image from '../../assets/images/pexels-ike-louie-natividad-3310694.jpg'

export default function Login() {

    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    console.log(user)

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleGoogleSignIn = async () => {
        const response = signInWithGooglePopup()
        console.log(response)
    }

    const handleSubmit = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()  
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                dispatch(userLogin({
                    uid: userCredential.user.uid,
                    name: userCredential.user.displayName,
                    email: userCredential.user.email,
                    phone: userCredential.user.phoneNumber,
                    emailVerified: userCredential.user.emailVerified,
                    photoURL: userCredential.user.photoURL,
                }))
                history.push('/')
            }) 
            .catch(error => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(error)
                setError(errorMessage)
            })
    }

    return (
        <div className="login">
            <div className="login__left">
                <h3 className="login__title">Login</h3>
                { error && error }
                <form className="login__form" method="post">
                    <label htmlFor="email" className="form__label">Email</label>
                    <input type="email" className="form__input" name="email" placeholder="Email" required onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    <label htmlFor="password" className="form__label">Password</label>
                    <input type="password" className="form__input" placeholder="Password" required onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    <button type="submit" className="form__submit" onClick={(e: MouseEvent<HTMLElement>) => handleSubmit(e)}>Login</button>
                </form>
                <p className="login__registerLink">Don't have an account? <a href="/register">Register.</a></p>
                <button className="login__googleBtn" onClick={handleGoogleSignIn}>Sign In With Google</button>
            </div>
            <div className="login__right">
                <img className="right__image" src={image} alt="" />
            </div>
        </div>
    )
}
