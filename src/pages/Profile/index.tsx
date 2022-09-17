import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { RootState } from "store";
import { signOutUser } from "utils/firebase";
import { userLogout } from "slices/userSlice";
import { clearCart } from "slices/cartSlice";
import { Button } from "components/Button";

import { StyledProfile } from "./styles";

export const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOutUser();
    dispatch(userLogout());
    dispatch(clearCart());
    history.push("/login");
  };

  return (
    user && (
      <StyledProfile>
        <div className="profile__info">
          <h1 className="info__greeting">Hello {user?.user?.displayName}</h1>
          <p>Name: {user?.user?.displayName}</p>
          <p>Email: {user?.user?.email}</p>
          <div className="info__links">
            <Link to="/cart">View your cart</Link>
            <Link to="/favorites">View your favorites</Link>
          </div>
          <Button title="Logout" onClick={handleSignOut} />
        </div>
      </StyledProfile>
    )
  );
};
