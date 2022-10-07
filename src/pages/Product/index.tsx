import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { Button } from "components/Button";
import { fetchProductItemById } from "slices/productSlice";
import {
  addItemToCart,
  addItemToFavorites,
  removeItemFromFavorites,
} from "slices/cartSlice";
import { RootState } from "store";
import { Item } from "./styles";

type IdParams = {
  productId: string;
};

interface IProduct {
  id: number;
  name: string;
  gender: string;
  color: string;
  images: Array<any>;
  media: {
    images: Array<any>;
  };
  price: {
    current: {
      value: number;
    };
  };
  isItemInFavorites?: boolean;
}

export const Product: React.FC = () => {
  const { productId } = useParams<IdParams>();
  const dispatch = useDispatch();

  const [cartSnackbar, setCartSnackbar] = useState(false);
  const [favSnackbar, setFavSnackbar] = useState(false);

  const [fillHeart, setFillHeart] = useState(false);
  const [image, setImage] = useState();

  const product = useSelector((state: RootState) => state.products);
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchProductItemById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    setImage(product?.selectedProduct?.media?.images[0].url);
    cart.favoriteItems?.find((item) => item.id === product?.selectedProduct?.id)
      ? setFillHeart(true)
      : setFillHeart(false);
  }, [product, cart.favoriteItems]);

  const handleAddToCart = (product: IProduct) => {
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        gender: product.gender,
        color: product.media.images[0].colour,
        images: product.media.images,
        price: product.price.current.value,
      })
    );
    setCartSnackbar(true);
  };

  const handleAddToFavorites = (product: IProduct) => {
    if (!fillHeart) {
      dispatch(
        addItemToFavorites({
          id: product.id,
          name: product.name,
          gender: product.gender,
          color: product.media.images[0].colour,
          images: product.media.images,
          price: product.price.current.value,
        })
      );
      setFavSnackbar(true);
    } else {
      dispatch(
        removeItemFromFavorites({
          id: product.id,
          name: product.name,
          gender: product.gender,
          color: product.media.images[0].colour,
          images: product.media.images,
          price: product.price.current.value,
        })
      );
      setFavSnackbar(true);
    }
    setFillHeart(!fillHeart);
  };

  return (
    <Item className="product__parent">
      <Snackbar
        open={cartSnackbar}
        autoHideDuration={6000}
        onClose={() => setCartSnackbar(false)}
      >
        <Alert severity="success">Item added to cart</Alert>
      </Snackbar>
      <Snackbar
        open={favSnackbar}
        autoHideDuration={6000}
        onClose={() => setFavSnackbar(false)}
      >
        <Alert severity="success">{fillHeart ? "Item added to favorites" : "Item removed from favorites"}</Alert>
      </Snackbar>
      {product.loading || product.selectedProduct.length === 0 ? (
        <CircularProgress sx={{ margin: "10rem auto", position: "relative" }} />
      ) : (
        <div className="product">
          <div className="product__left">
            <div className="left__imageList">
              {product?.selectedProduct?.media?.images?.map((image: any) => {
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
              alt={product?.selectedProduct?.name}
            />
          </div>
          <div className="product__right">
            <p className="right__category">
              {product?.selectedProduct?.pdpLayout +
                " — " +
                product?.selectedProduct?.productType?.name}
            </p>
            <h3 className="right__title">{product?.selectedProduct?.name}</h3>
            <div className="right__info">
              <span className="info__price">
                {product?.selectedProduct?.price?.current?.text}
              </span>
            </div>
            <div className="right__heading">
              <span>Gender: </span>
              {product?.selectedProduct?.gender}
            </div>
            <div className="right__heading">
              <span>Colour: </span>
              {product?.selectedProduct?.media?.images[0]?.colour}
            </div>
            <div
              className="right__description"
              dangerouslySetInnerHTML={{
                __html: product?.selectedProduct?.description,
              }}
            ></div>
            <div className="right__buttons">
              <Button
                title="Add to cart"
                onClick={() => handleAddToCart(product?.selectedProduct)}
              />
              <button
                className="buttons__favorite"
                onClick={() => handleAddToFavorites(product?.selectedProduct)}
              >
                {fillHeart ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
            </div>
          </div>
        </div>
      )}
    </Item>
  );
};
