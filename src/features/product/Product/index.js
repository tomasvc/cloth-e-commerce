import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CircularProgress, Snackbar } from "@mui/material";
import { fetchProductItemById } from "../productSlice";
import {
  addItemToCart,
  removeItemFromCart,
  addItemToFavorites,
  removeItemFromFavorites,
} from "../../cart/cartSlice";
import "./styles.css";

export default function Product() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [cartSnackbar, setCartSnackbar] = useState(false)
  const [favSnackbar, setFavSnackbar] = useState(false)

  const [fillHeart, setFillHeart] = useState(false);
  const [image, setImage] = useState();

  const product = useSelector((state) => state.products);

  console.log(product)

  useEffect(() => {
    dispatch(fetchProductItemById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    setImage(product?.selectedProduct.media.images[0].url);
  }, [product]);

  const handleAddToCart = (product) => {
    //   dispatch(addItemToCart(product))
    setCartSnackbar(true)
  }

  return (
    <div className="product__parent">
        <Snackbar
        open={cartSnackbar}
        autoHideDuration={6000}
        onClose={() => setCartSnackbar(false)}
        message="Item added to cart"
      />
      <Snackbar
        open={favSnackbar}
        autoHideDuration={6000}
        onClose={() => setFavSnackbar(false)}
        message="Item added to favorites"
      />
      {product.loading ? (
        <CircularProgress sx={{ margin: "10rem auto", position: "relative" }} />
      ) : (
        <div className="product">
          <div className="product__left">
            <div className="left__imageList">
              {product?.selectedProduct.media.images.map((image) => {
                return (
                  <img
                    key={image.type}
                    src={"https://" + image.url}
                    onClick={() => setImage(image.url)}
                    alt=""
                    width="50"
                    height="50"
                  />
                );
              })}
            </div>
            <img
              className="left__image"
              src={"https://" + image}
              alt={product?.selectedProduct.name}
            />
          </div>
          <div className="product__right">
            <p className="right__category">
              {product?.selectedProduct.pdpLayout +
                " — " +
                product?.selectedProduct.productType.name}
            </p>
            <h3 className="right__title">{product?.selectedProduct.name}</h3>
            <div className="right__info">
              <span className="info__price">
                {product?.selectedProduct.price.current.text}
              </span>
            </div>
            <div className="right__heading">
              <span>Gender: </span>
              {product?.selectedProduct.gender}
            </div>
            <div className="right__heading">
              <span>Colour: </span>
              {product?.selectedProduct.media.images[0].colour}
            </div>
            <div
              className="right__description"
              dangerouslySetInnerHTML={{
                __html: product?.selectedProduct.description,
              }}
            ></div>
            <div className="right__buttons">
              <button className="buttons__addToCart" onClick={() => handleAddToCart}>Add to cart</button>
              <button
                className="buttons__favorite"
                onClick={() => setFillHeart(!fillHeart)}
              >
                {fillHeart ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
