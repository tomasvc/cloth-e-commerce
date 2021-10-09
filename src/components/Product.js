import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import axios from 'axios'
import './Product.css'

export default function Product() {

    const {productId} = useParams()

    const [product, setProduct] = useState()
    const [fillHeart, setFillHeart] = useState(false)
    const [image, setImage] = useState()

    const API_KEY = "78a110ed1dmshbcfebcdca14633ap13f5ffjsn7c75c6dcf1c0"

    const options = {
        method: 'GET',
        url: 'https://asos2.p.rapidapi.com/products/v3/detail',
        params: {
            id: productId, 
            lang: 'en-US', 
            store: 'US', 
            sizeSchema: 'US', 
            currency: 'GBP'
        },
        headers: {
            'x-rapidapi-host': 'asos2.p.rapidapi.com',
            'x-rapidapi-key': API_KEY
        }
    }

    useEffect(() => {

        productId &&
        axios.request(options).then((response) => {
            console.log(response.data)
            setProduct(response.data)
            setImage(response.data.media.images[0].url)
        }).catch((error) => {
            console.error(error);
        });

    }, [productId])


    return (
        <div className="product--parent">

            <div className="product">
                <div className="product__left">
                    <div className="left__imageList">
                        {product?.media.images.map((image) => {
                            return <img key={image.type} src={'https://' + image.url} onClick={() => setImage(image.url)} alt='' width="50" height="50" />
                        })}
                    </div>
                    <img className="left__image" src={'https://' + image} alt={product?.name} />
                </div>
                <div className="product__right">
                    <p className="right__category">{product?.pdpLayout + ' — ' + product?.productType.name}</p>
                    <h3 className="right__title">{product?.name}</h3>
                    <div className="right__info">
                        <span className="info__price">{product?.price.current.text}</span>
                    </div>
                    <div className="right__heading"><span>Gender: </span>{product?.gender}</div>
                    <div className="right__heading"><span>Colour: </span>{product?.media.images[0].colour}</div>
                    <div className="right__description" dangerouslySetInnerHTML={{__html: product?.description}}></div>
                    <div className="right__buttons">
                        <button className="buttons__addToCart">Add to cart</button>
                        <button className="buttons__favorite" onClick={() => setFillHeart(!fillHeart)}>{fillHeart ? <AiFillHeart/> : <AiOutlineHeart/>}</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
