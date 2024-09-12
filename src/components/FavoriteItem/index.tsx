import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCartThunk } from "slices/cartSlice";
import { removeItemFromFavoritesThunk } from "slices/favoriteSlice";
import { resetSelectedProduct } from "slices/productSlice";

type FavoriteItemProps = {
  id: string;
  name: string;
  gender: string;
  color: string;
  images: Array<any>;
  price: number;
  quantity: number;
};

export const FavoriteItem: React.FC<FavoriteItemProps> = (favoriteItem) => {
  const { name, gender, color, images, price } = favoriteItem;
  const dispatch = useDispatch();

  const handleMoveToCart = (item: FavoriteItemProps) => {
    dispatch(addItemToCartThunk(item));
    dispatch(removeItemFromFavoritesThunk(item));
  };

  return (
    <div
      className="font-['Oswald'] flex flex-col sm:flex-row gap-6 w-full mb-4 p-8 bg-white border border-gray-100"
      style={{ boxShadow: "2px 4px 15px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="mx-auto">
        <img
          src={images && "https://" + images[0]?.url}
          alt={name}
          width="120"
        />
      </div>
      <div className="w-full">
        <a
          onClick={() => dispatch(resetSelectedProduct())}
          href={"/product/" + favoriteItem.id}
          className="text-lg font-medium"
        >
          {name}
        </a>
        <p className="py-1">
          {gender} | {color}
        </p>
        <div>
          <p className="py-4 font-semibold">${price?.toFixed(2)}</p>
        </div>
        <div className="flex flex-col gap-2 w-full sm:w-1/2 lg:w-1/4">
          <button
            onClick={() => handleMoveToCart(favoriteItem)}
            className="w-full uppercase bg-gray-800 text-white py-2 rounded mt-2 hover:sm:bg-amber-600 transition ease-out"
          >
            Move to cart
          </button>
          <button
            onClick={() => dispatch(removeItemFromFavoritesThunk(favoriteItem))}
            className="text-center uppercase text-gray-800 py-2 border border-slate-800 rounded hover:sm:bg-slate-100 transition"
          >
            Remove from favorites
          </button>
        </div>
      </div>
    </div>
  );
};
