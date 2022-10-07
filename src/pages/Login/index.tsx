import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { userLogin, userError } from "slices/userSlice";
import { updateCartFromFirestore } from "slices/cartSlice";
import {
  auth,
  signInWithGooglePopup,
  getUserCartFromFirestore,
} from "utils/firebase";
import { StyledLogin } from "./styles";
import image from "assets/images/pexels-ike-louie-natividad-3310694.jpg";

export const Login: React.FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const user = useSelector((state: RootState) => state.user)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    await signInWithGooglePopup().then(async data => {
      dispatch(userLogin({
        uid: data.user.uid,
        displayName: data.user.displayName,
        email: data.user.email,
      }))
      const cart = await getUserCartFromFirestore(data.user);
      dispatch(updateCartFromFirestore(cart));
      history.push("/");
    })
    .catch((error) => {
      console.log(error.message)
      dispatch(userError(error.errorMessage))
    });
  };

  const handleSubmit = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        dispatch(
          userLogin({
            uid: userCredential.user.uid,
            displayName: userCredential.user.displayName,
            email: userCredential.user.email,
            phone: userCredential.user.phoneNumber
          })
        );
        const cart = await getUserCartFromFirestore(userCredential.user);
        dispatch(updateCartFromFirestore(cart));
        history.push("/");
      })
      .catch((error) => {
        console.log(error.message)
        dispatch(userError(error.errorMessage))
      });
  };

  return (
    <StyledLogin className="login">
      <div className="login__left">
        <h3 className="login__title">Login</h3>
        {user.error && <p>{user.error}</p>}
        <form className="login__form" method="post">
          <label htmlFor="email" className="form__label">
            Email
          </label>
          <input
            type="email"
            className="form__input"
            name="email"
            placeholder="Email"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <label htmlFor="password" className="form__label">
            Password
          </label>
          <input
            type="password"
            className="form__input"
            placeholder="Password"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <button
            type="submit"
            className="form__submit"
            onClick={(e: MouseEvent<HTMLElement>) => handleSubmit(e)}
          >
            Login
          </button>
        </form>
        <p className="login__registerLink">
          Don't have an account? <a href="/register">Register.</a>
        </p>
        <button className="login__googleBtn" onClick={handleGoogleSignIn}>
          Sign In With Google
        </button>
      </div>
      <div className="login__right">
        <img className="right__image" src={image} alt="" />
      </div>
    </StyledLogin>
  );
};
