import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Profile() {

    const user = useSelector(state => state.user)
    console.log(user)

    return (
        user && (
            <div>
                <img src={user.user.picture} alt={user.user.displayName} />
                <h2>{user.user.name}</h2>
                <p>{user.user.email}</p>
            </div>
        )
    )
}
