import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "store";
import { signOutUser } from "utils/firebase";
import { userLogout } from "slices/userSlice";
import { clearCart } from "slices/cartSlice";
import image from "assets/images/profile-bg.jpg";

export const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOutUser().then(() => {
      dispatch(userLogout());
      dispatch(clearCart());
      navigate("/login");
    });
  };

  return (
    user && (
      <div className="flex flex-col-reverse md:flex-row justify-between pt-14 h-full bg-white">
        <div className="max-w-xl w-full ml-auto px-4 md:px-8 xl:px-0 mr-8 flex flex-col justify-start gap-2 pt-8 md:pt-16 mb-12">
          <h1 className="font-['Oswald'] text-3xl mb-4">Hello</h1>
          <div className="mb-4">
            <p className="text-light text-xs tracking-wide uppercase mb-1">
              Name
            </p>
            <p>{user?.user?.displayName}</p>
          </div>
          <div>
            <p className="text-light text-xs tracking-wide uppercase mb-1">
              Email
            </p>
            <p>{user?.user?.email}</p>
          </div>
          <div className="font-['Oswald'] flex flex-col gap-3 mt-10 mb-4 w-full sm:w-1/2">
            <Link
              to="/cart"
              className="text-center uppercase text-gray-800 py-2 border border-slate-800 rounded mt-6 hover:sm:bg-slate-100 transition"
            >
              View your cart
            </Link>
            <Link
              to="/favorites"
              className="text-center uppercase text-gray-800 py-2 border border-slate-800 rounded hover:sm:bg-slate-100 transition"
            >
              View your favorites
            </Link>
          </div>
          <button
            className="w-full sm:w-1/2 font-['Oswald'] uppercase bg-gray-800 text-white py-2 rounded mt-2 hover:sm:bg-amber-600 transition ease-out"
            onClick={handleSignOut}
          >
            Log out
          </button>
        </div>
        <div className="w-full md:w-1/2">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt="Profile"
          />
        </div>
      </div>
    )
  );
};
