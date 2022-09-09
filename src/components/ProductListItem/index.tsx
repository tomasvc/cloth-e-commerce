import React from 'react'
import './styles.css'

export default function ListItem(props: any) {
    return (
        <div className="list__item">
            <div className="item__top">
                <a href={'/product/' + props.id}><img className="top__image" src={'https://' + props.image} alt={props.name} /></a>
            </div>
            <div className="item__info">
            <a href={'/product/' + props.id}><p className="info__title">{props.name}</p></a>
                <div className="info__bottom">
                    <p className="bottom__price">{props.price}</p>
                </div>
            </div>
        </div>
    )
}
