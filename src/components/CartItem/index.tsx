import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "slices/cartSlice";
import { Item, Button } from "./styles";

type CartItemProps = {
  id: string;
  name: string;
  gender: string;
  color: string;
  images: Array<any>;
  price: number;
  quantity: number;
};

export const CartItem: React.FC<CartItemProps> = (cartItem) => {
  const { name, gender, color, images, price, quantity } = cartItem;
  const dispatch = useDispatch();

  return (
    <Item className="cart__item">
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
        <p className="info__quantityLabel">Quantity:</p>
        <div className="info__bottom">
          <div className="info__quantity">
            <Button
              className="quantity__btn btn__remove"
              onClick={() => dispatch(removeItemFromCart(cartItem))}
            >
              -
            </Button>
            <p className="quantity__num">{quantity}</p>
            <Button
              className="quantity__btn"
              onClick={() => dispatch(addItemToCart(cartItem))}
            >
              +
            </Button>
          </div>
          <p className="info__price">
            ${(price * quantity).toFixed(2)}
          </p>
        </div>
        <button className="info__addBtn">Add to favorites</button>
      </div>
    </Item>
  );
}
