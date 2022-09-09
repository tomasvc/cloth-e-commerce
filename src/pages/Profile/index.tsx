import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { RootState } from "../../store";
import { signOutUser } from 'utils/firebase'
import { userLogout } from 'slices/userSlice'

export default function Profile() {
  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  const history = useHistory()
  const dispatch = useDispatch()

  const handleSignOut = () => {
    signOutUser();
    dispatch(userLogout())
    history.push('/login')
  }

  return (
    user && (
      <div>
        <img
          src={user?.user?.photoURL ? user.user.photoURL : undefined}
          alt={user?.user?.displayName ? user.user.displayName : undefined}
        />
        <h2>{user?.user?.displayName}</h2>
        <p>{user?.user?.email}</p>
        <button onClick={handleSignOut}>Logout</button>
      </div>
    )
  );
}
