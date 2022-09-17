import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { CartItem } from "components/CartItem";
import { StyledCart } from "./styles";

import visa from "assets/images/visa.svg";
import mastercard from "assets/images/mastercard.svg";
import amex from "assets/images/amex.svg";
import paypal from "assets/images/paypal.svg";
import applePay from "assets/images/apple-pay.svg";

type CartItemProps = {
  id: string;
  name: string;
  gender: string;
  color: string;
  images: Array<any>;
  price: number;
  quantity: number;
};

export const Cart: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);

  const totalPrice = cart?.cartItems?.reduce(
    (total: number, cartItem: CartItemProps) =>
      total + cartItem?.price * cartItem?.quantity,
    0
  );

  useEffect(() => {
    console.log(user);
    console.log(cart);
  }, [user, cart]);

  return (
    <StyledCart className="cart">
      <h1 className="cart__label">Cart</h1>
      <div className="cart__wrapper">
        {cart?.cartItems?.length ? (
          <>
            <div className="cart__items">
              {cart?.cartItems?.map((cartItem: CartItemProps, id: number) => {
                return <CartItem key={id} {...cartItem} />;
              })}
            </div>

            <div className="cart__summary">
              <h2 className="summary__label">Summary</h2>
              <div className="summary__total">
                <p>Total (excluding delivery):</p>
                <p className="total__price">${totalPrice.toFixed(2)}</p>
              </div>

              <div className="summary__buttons">
                <button
                  className="buttons__shopBtn"
                  onClick={() => (document.location.href = "/checkout")}
                >
                  Continue to checkout
                </button>
                <a href="/products" className="buttons__continueBtn">
                  Continue shopping
                </a>
              </div>
              <div className="summary__payments">
                <img src={visa} alt="Visa" height="20" />
                <img src={mastercard} alt="Mastercard" height="20" />
                <img src={amex} alt="American Express" height="20" />
                <img src={paypal} alt="PayPal" height="20" />
                <img src={applePay} alt="Apple Pay" height="20" />
              </div>
            </div>
          </>
        ) : (
          <h3 className="cart__title">Your cart is empty</h3>
        )}
      </div>
    </StyledCart>
  );
};
