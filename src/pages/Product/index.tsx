import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { fetchProductItemById } from "slices/productSlice";
import { addItemToCartThunk } from "slices/cartSlice";
import {
  addItemToFavoritesThunk,
  removeItemFromFavoritesThunk,
} from "../../slices/favoriteSlice";
import { useProduct } from "api/getProduct";
import { useProductPrice } from "api/getProductPrice";
import { useAlsoLike } from "api/getAlsoLike";
import { useBuyTheLook } from "api/getBuyTheLook";
import { motion } from "framer-motion";
import { Product as ProductType } from "./types";

import { ProductActions } from "./components/ProductActions";
import { ProductDetails } from "./components/ProductDetails";
import { ProductGallery } from "./components/ProductGallery";

type IDParams = {
  productId: string;
};

export const Product: React.FC = () => {
  const { productId } = useParams<IDParams>();
  const dispatch = useDispatch();

  const { data: product, isLoading } = useProduct({
    productId,
  });
  const { data: productPrice, isLoading: isPriceLoading } = useProductPrice({
    productId,
  });

  const { data: alsoLikeData } = useAlsoLike({
    productId,
  });

  const { data: buyLookData } = useBuyTheLook({
    productId,
  });

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProductItemById(productId));
  }, [dispatch, productId]);

  const handleAddToCart = (product: ProductType) => {
    dispatch(
      addItemToCartThunk({
        id: product?.id,
        name: product?.name!,
        gender: product.gender!,
        color: product?.media?.images?.length
          ? product?.media.images[0].colour!
          : "N/A",
        images: product?.media?.images?.length ? product?.media?.images : null,
        price: productPrice?.data[0]?.productPrice?.current?.value!,
        quantity: 1,
        size: selectedSize,
      })
    );
  };

  const handleAddToFavorites = (product: ProductType) => {
    dispatch(
      addItemToFavoritesThunk({
        id: product?.id,
        name: product?.name!,
        gender: product?.gender!,
        color: product?.media?.images?.length
          ? product.media.images[0].colour!
          : "N/A",
        images: product?.media?.images?.length ? product?.media?.images : null,
        price: productPrice?.data[0]?.productPrice?.current?.value!,
        quantity: 1,
      })
    );
  };

  const handleRemoveFromFavorites = (product: ProductType) => {
    dispatch(
      removeItemFromFavoritesThunk({
        id: product.id,
        name: product.name!,
        gender: product.gender!,
        color: product?.media?.images?.length
          ? product.media.images[0].colour!
          : "N/A",
        images: product?.media?.images?.length ? product.media.images : null,
        price: productPrice?.data[0]?.productPrice?.current?.value!,
        quantity: 1,
      })
    );
  };

  return (
    <div>
      {isLoading || isPriceLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <CircularProgress
            sx={{ margin: "10rem auto", position: "relative" }}
          />
        </div>
      ) : product?.data ? (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <div className="flex flex-col lg:flex-row gap-8 font-['Oswald'] max-w-7xl mx-auto px-4 md:px-8 my-10 pt-10">
            <ProductGallery product={product?.data} />
            <div className="w-full lg:w-1/2">
              <ProductDetails
                product={product?.data}
                productPrice={
                  productPrice?.data[0]?.productPrice?.current?.text!
                }
                setSelectedSize={setSelectedSize}
                size={selectedSize || ""}
              />
              <ProductActions
                product={product?.data}
                handleAddToCart={handleAddToCart}
                handleAddToFavorites={handleAddToFavorites}
                handleRemoveFromFavorites={handleRemoveFromFavorites}
              />
            </div>
          </div>
          {!!alsoLikeData?.data?.data?.length && (
            <div className="border-t my-10 font-['Oswald']">
              <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-20">
                <h3 className="text-xl text-gray-800 font-bold uppercase tracking-wider mb-4">
                  You might also like
                </h3>
                <div className="flex gap-y-10 flex-wrap">
                  {alsoLikeData?.data?.data?.map((item: any, index: number) => {
                    return (
                      <a
                        key={index}
                        href={`/product/${item.id}`}
                        className="w-1/2 sm:w-1/3 lg:w-1/6 h-auto p-2.5 sm:hover:shadow-lg sm:hover:cursor-pointer sm:hover:scale-105 transition-all ease-out"
                      >
                        <img
                          src={`https://${item.imageUrl || ""}`}
                          alt={item.name}
                          className="w-full h-auto"
                        />
                        <p className="pt-2 font-light text-lg truncate">
                          {item.name}
                        </p>
                        <div>
                          <p className="font-medium">
                            {item.price.current.text}
                          </p>
                          <p className="text-gray-400 font-light line-through">
                            {item.price.previous && item.price.previous.text}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {!!buyLookData?.data?.data?.products?.length && (
            <div className="border-t my-20 font-['Oswald']">
              <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-20">
                <h3 className="text-xl text-gray-800 font-bold uppercase tracking-wider mb-4">
                  Buy the look
                </h3>
                <div className="flex gap-y-10 flex-wrap">
                  {buyLookData?.data?.data?.products?.map(
                    (item: any, index: number) => {
                      return (
                        <a
                          key={index}
                          href={`/product/${item?.id}`}
                          className="w-1/2 sm:w-1/3 lg:w-1/6 h-auto p-2.5 sm:hover:shadow-lg sm:hover:cursor-pointer sm:hover:scale-105 transition-all ease-out"
                        >
                          <img
                            src={item?.imageUrl || ""}
                            alt={item?.name}
                            className="w-full h-auto"
                          />
                          <p className="pt-2 font-light text-lg truncate">
                            {item?.name}
                          </p>
                          <div>
                            <p className="font-medium">
                              {item?.price.current.text}
                            </p>
                            <p className="text-gray-400 font-light line-through">
                              {item?.price.previous &&
                                item?.price.previous.text}
                            </p>
                          </div>
                        </a>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <div className="py-20 max-w-7xl mx-auto">
            <p className="px-8">Details of this product could not be found.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
