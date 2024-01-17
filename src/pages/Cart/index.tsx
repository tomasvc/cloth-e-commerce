import { CartItem } from "components/CartItem";
import { MainLayout } from "components/MainLayout";
import { RootState } from "store";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

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
  size?: string | null;
};

export const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  const totalPrice = cart?.items?.reduce(
    (total: number, cartItem: CartItemProps) =>
      total + cartItem?.price * cartItem?.quantity,
    0
  );

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center min-h-screen max-w-7xl mx-auto px-4 md:px-8 pb-10 mt-16 bg-gray-50 font-['Oswald']">
        <div className="flex flex-col justify-left w-full lg:flex-row gap-4 pb-20">
          {cart?.items?.length ? (
            <div className="flex flex-col w-full pt-10">
              <h1 className="font-['Oswald'] text-gray-800 w-fit text-4xl font-medium pb-6 uppercase tracking-widest">
                Cart
              </h1>
              <div className="flex flex-col-reverse md:flex-row gap-4">
                <div className="w-full">
                  {cart?.items?.map((cartItem: CartItemProps, id: number) => {
                    return <CartItem key={id} {...cartItem} />;
                  })}
                </div>
                <div className="relative w-full md:w-1/3">
                  <div
                    className="border border-gray-100 bg-white p-8 h-fit lg:fixed"
                    style={{ boxShadow: "2px 4px 15px rgba(0, 0, 0, 0.05)" }}
                  >
                    <h2 className="text-xl">Summary</h2>
                    <div className="w-full flex gap-4 mt-3 mb-4">
                      <input
                        className="w-2/3 border-2 border-slate-2400 placeholder:text-slate-400/70 placeholder:font-['Oswald'] px-3 py-1 rounded-md"
                        type="text"
                        placeholder="COUPON CODE"
                      />
                      <button className="w-1/3 bg-indigo-100/70 text-blue-500 text-sm uppercase rounded-md hover:bg-indigo-200/60 hover:scale-105 transition ease-out">
                        Apply
                      </button>
                    </div>
                    <div className="text-md mt-2 flex justify-between">
                      <p className="text-slate-600 text-light text-sm tracking-wide uppercase self-center">
                        Total (excluding delivery):
                      </p>
                      <p className="font-bold ml-10">
                        ${totalPrice.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col mt-4">
                      <button className="text-sm uppercase bg-gray-800 text-white py-3 rounded mt-2 hover:sm:bg-amber-600 transition ease-out">
                        Continue to checkout
                      </button>
                      <a
                        href="/products/27110"
                        className="text-sm text-center uppercase text-gray-800 mt-3 py-2.5 border border-slate-800 rounded hover:sm:bg-slate-100 transition"
                      >
                        Continue shopping
                      </a>
                    </div>
                    <div className="flex justify-center items-center gap-4 mt-10">
                      <img src={visa} alt="Visa" className="w-auto h-5" />
                      <img
                        src={mastercard}
                        alt="Mastercard"
                        className="w-auto h-5"
                      />
                      <img
                        src={amex}
                        alt="American Express"
                        className="w-auto h-5"
                      />
                      <img src={paypal} alt="PayPal" className="w-auto h-5" />
                      <img
                        src={applePay}
                        alt="Apple Pay"
                        className="w-auto h-5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-full pb-20">
              <h1 className="w-fit text-4xl font-medium px-4 xl:px-0 pb-6 uppercase tracking-widest">
                Cart
              </h1>
              <h3 className="text-4xl font-light pb-8">Your cart is empty</h3>
              <Link
                to="/products/27110"
                className="w-fit font-['Oswald'] uppercase bg-gray-800 text-white text-center px-12 py-3 rounded mt-2 hover:sm:bg-amber-600 transition ease-out"
              >
                Continue shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
