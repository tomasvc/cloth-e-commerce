import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin, userError } from "slices/userSlice";
import { updateCartFromFirestore } from "slices/cartSlice";
import { updateFavoritesFromFirestore } from "slices/favoriteSlice";
import { LoginForm } from "./components/LoginForm";
import image from "assets/images/pexels-ike-louie-natividad-3310694.jpg";
import {
  signInWithGooglePopup,
  getUserCartFromFirestore,
  getUserFavoritesFromFirestore,
  auth,
} from "utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        dispatch(
          userLogin({
            uid: userCredential.user.uid,
            displayName: userCredential.user.displayName,
            email: userCredential.user.email,
            phone: userCredential.user.phoneNumber,
          })
        );
        const cart = await getUserCartFromFirestore(userCredential.user);
        const favorites = await getUserFavoritesFromFirestore(
          userCredential.user
        );
        dispatch(updateFavoritesFromFirestore(favorites));
        dispatch(updateCartFromFirestore(cart));
        setIsLoading(false);
        navigate("/profile");
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setError("Wrong password");
        } else if (error.code === "auth/user-not-found") {
          setError("The user with that email was not found");
        } else {
          setError(
            `An error has occured while trying to login (${error.code})`
          );
        }
        dispatch(userError(error.errorMessage));
        setIsLoading(false);
      });
  };

  const handleGoogleSignIn = async () => {
    await signInWithGooglePopup()
      .then(async (data) => {
        dispatch(
          userLogin({
            uid: data.user.uid,
            displayName: data.user.displayName,
            email: data.user.email,
          })
        );
        const cart = await getUserCartFromFirestore(data.user);
        const favorites = await getUserFavoritesFromFirestore(data.user);
        dispatch(updateCartFromFirestore(cart));
        dispatch(updateFavoritesFromFirestore(favorites));
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(userError(error.errorMessage));
      });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row">
      <LoginForm
        onSubmit={handleFormSubmit}
        onGoogleSignIn={handleGoogleSignIn}
        error={error}
        isLoading={isLoading}
      />
      <div className="w-full h-[40vh] lg:w-1/2 lg:h-screen">
        <img
          className="object-cover object-top w-full h-full"
          src={image}
          alt="Login background"
        />
      </div>
    </div>
  );
};
