import React from 'react'

import './Cart.css'

export default function Cart() {
    return (
        <div className="cart">
            <h3 className="cart__title">Your cart is empty</h3>
            <button className="cart__shopBtn" onClick={() => document.location.href = "/products"}>Continue shopping</button>
        </div>
    )
}
