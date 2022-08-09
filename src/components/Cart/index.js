import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import './styles.css'

export default function Cart() {

    const user = useSelector(state => state.user)

    useEffect(() => {
        // if (!user) {
        //     window.location.href = '/login'
        // }
        console.log(user)
    }, [user])

    return (
        <div className="cart">
            <h3 className="cart__title">Your cart is empty</h3>
            <button className="cart__shopBtn" onClick={() => document.location.href = "/products"}>Continue shopping</button>
        </div>
    )
}
