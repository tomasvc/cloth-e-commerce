import React from "react";
import { useDispatch } from "react-redux";
import { removeItemFromFavorites, addItemToCart } from "slices/cartSlice";
import { Item } from "./styles";

type FavoriteItemProps = {
  id: string;
  name: string;
  gender: string;
  color: string;
  images: Array<any>;
  price: number;
  quantity?: number;
};

export const FavoriteItem: React.FC<FavoriteItemProps> = (favoriteItem) => {
  const { name, gender, color, images, price } = favoriteItem;
  const dispatch = useDispatch();

  const handleMoveToCart = (item: FavoriteItemProps) => {
    dispatch(addItemToCart(item));
    dispatch(removeItemFromFavorites(item));
  };

  return (
    <Item className="favorite__item">
      <div className="item__image">
        <img
          src={images && "https://" + images[0]?.url}
          alt={name}
          width="120"
        />
      </div>
      <div className="item__info">
        <p className="info__name">{name}</p>
        <p className="info__genderAndColor">
          {gender} | {color}
        </p>
        <div className="info__bottom">
          <p className="info__price">${price?.toFixed(2)}</p>
        </div>
        <div className="info__buttons">
          <button
            onClick={() => handleMoveToCart(favoriteItem)}
            className="info__btn"
          >
            Move to cart
          </button>
          <button
            onClick={() => dispatch(removeItemFromFavorites(favoriteItem))}
            className="info__btn remove__btn"
          >
            Remove from favorites
          </button>
        </div>
      </div>
    </Item>
  );
};
