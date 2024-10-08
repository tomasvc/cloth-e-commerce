import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Product } from "../../types";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";
import { Alert, Snackbar } from "@mui/material";
import { resetFavoriteActionCompletedFlag } from "slices/favoriteSlice";
import { resetCartActionCompletedFlag } from "slices/cartSlice";

type Props = {
  product: Product;
  handleAddToCart: (product: Product) => void;
  handleAddToFavorites: (product: Product) => void;
  handleRemoveFromFavorites: (product: Product) => void;
};

export const ProductActions = ({
  product,
  handleAddToCart,
  handleAddToFavorites,
  handleRemoveFromFavorites,
}: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const favorites = useSelector((state: RootState) => state.favorites);
  const cartActionCompleted = useSelector(
    (state: RootState) => state.cart.actionCompleted
  );

  const isItemInFavorites = () =>
    favorites.items?.some((item: any) => item.id === product?.id) ?? false;

  const [isFavorite, setIsFavorite] = useState(isItemInFavorites());
  const [cartSnackbar, setCartSnackbar] = useState(false);
  const [favSnackbar, setFavSnackbar] = useState(false);

  const handleAddOrRemoveFavorites = () => {
    if (user.user) {
      if (isItemInFavorites()) {
        handleRemoveFromFavorites(product);
      } else {
        handleAddToFavorites(product);
      }
      setIsFavorite(true);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (favorites.actionCompleted) {
      setFavSnackbar(true);
      dispatch(resetFavoriteActionCompletedFlag());
    }
  }, [favorites.actionCompleted, dispatch]);

  useEffect(() => {
    if (cartActionCompleted) {
      setCartSnackbar(true);
      dispatch(resetCartActionCompletedFlag());
    }
  }, [cartActionCompleted, dispatch]);

  return (
    <>
      <div className="max-w-lg md:max-w-auto mx-auto flex items-center gap-4 pt-8">
        <button
          className="text-sm uppercase bg-gray-800 text-white px-6 py-3 rounded hover:sm:bg-amber-600 transition ease-out"
          title="Add to cart"
          onClick={() =>
            user.user ? handleAddToCart(product) : navigate("/login")
          }
        >
          Add to cart
        </button>
        <button
          className="w-12 h-12 rounded-full bg-gray-100 flex justify-center items-center hover:scale-110 transition ease-out"
          onClick={() => handleAddOrRemoveFavorites()}
        >
          {isFavorite ? (
            <AiFillHeart className="w-6 h-6" />
          ) : (
            <AiOutlineHeart className="w-6 h-6" />
          )}
        </button>
      </div>
      <Snackbar
        open={cartSnackbar}
        autoHideDuration={6000}
        onClose={() => setCartSnackbar(false)}
      >
        <Alert severity="success">Item added to cart</Alert>
      </Snackbar>
      <Snackbar
        open={favSnackbar}
        autoHideDuration={6000}
        onClose={() => setFavSnackbar(false)}
      >
        <Alert severity="success">
          {isFavorite
            ? "Item added to favorites"
            : "Item removed from favorites"}
        </Alert>
      </Snackbar>
    </>
  );
};
