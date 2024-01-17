import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { addItemToCartThunk, removeItemFromCartThunk } from "slices/cartSlice";
import {
  addItemToFavoritesThunk,
  removeItemFromFavoritesThunk,
} from "../../slices/favoriteSlice";
import { FiPlus, FiMinus } from "react-icons/fi";

type CartItemProps = {
  id: string;
  name: string;
  gender: string;
  color: string;
  images: Array<any>;
  price: number;
  quantity: number;
  size?: string | null;
};

export const CartItem: React.FC<CartItemProps> = (cartItem) => {
  const { name, gender, color, images, price, quantity, size } = cartItem;
  const favorites = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch();

  const isItemInFavorites = (item: CartItemProps) => {
    return favorites.items?.find((item: any) => item.id === cartItem?.id);
  };

  const handleAddToFavorites = (item: CartItemProps) => {
    isItemInFavorites(item)
      ? dispatch(removeItemFromFavoritesThunk(cartItem))
      : dispatch(addItemToFavoritesThunk(cartItem));
  };

  return (
    <div
      className="flex flex-col sm:flex-row gap-6 w-full mb-4 p-8 bg-white border border-gray-100"
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
        <p className="text-lg font-medium">{name}</p>
        <p className="py-1">
          {gender} | {color} {size && `| ${size}`}
        </p>
        <p className="text-light text-sm tracking-wide uppercase my-2">
          Quantity
        </p>
        <div className="flex justify-between mb-8">
          <div className="flex items-center gap-4 font-semibold">
            <button
              className="flex justify-center items-center w-[50px] h-[50px] text-2xl font-thin border border-gray-300 rounded-sm hover:border-gray-500 transition duration-300"
              onClick={() => dispatch(removeItemFromCartThunk(cartItem))}
            >
              <FiMinus className="w-4 h-4 text-gray-800" />
            </button>
            <p>{quantity}</p>
            <button
              className="flex justify-center items-center w-[50px] h-[50px] text-2xl font-thin border border-gray-300 rounded-sm hover:border-gray-500 transition duration-300"
              onClick={() => dispatch(addItemToCartThunk(cartItem))}
            >
              <FiPlus className="w-4 h-4 text-gray-800" />
            </button>
          </div>
          <p className="py-4 font-semibold">${(price * quantity).toFixed(2)}</p>
        </div>
        <button
          className="text-center uppercase text-gray-800 px-6 py-2 border border-slate-800 rounded hover:sm:bg-slate-100 transition"
          onClick={() => handleAddToFavorites(cartItem)}
        >
          {isItemInFavorites(cartItem)
            ? "Remove item from favorites"
            : "Add item to favorites"}
        </button>
      </div>
    </div>
  );
};
