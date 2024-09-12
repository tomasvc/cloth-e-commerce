import React, { useState, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
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

const ProductActions = lazy(() =>
  import("./components/ProductActions").then((module) => ({
    default: module.ProductActions,
  }))
);
const ProductDetails = lazy(() =>
  import("./components/ProductDetails").then((module) => ({
    default: module.ProductDetails,
  }))
);
const ProductGallery = lazy(() =>
  import("./components/ProductGallery").then((module) => ({
    default: module.ProductGallery,
  }))
);
const ProductGrid = lazy(() =>
  import("./components/ProductGrid").then((module) => ({
    default: module.ProductGrid,
  }))
);

type IDParams = {
  productId: string;
};

export const Product: React.FC = () => {
  const { productId = "" } = useParams<IDParams>();
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

  if (isLoading || isPriceLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <CircularProgress sx={{ margin: "10rem auto", position: "relative" }} />
      </div>
    );
  }

  if (!product?.data) {
    return (
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <div className="py-20 max-w-7xl mx-auto">
          <p className="px-8">Details of this product could not be found.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <div className="flex flex-col lg:flex-row gap-8 font-['Oswald'] max-w-7xl mx-auto px-4 md:px-8 my-10 pt-10">
        <Suspense fallback={<CircularProgress />}>
          <ProductGallery product={product?.data} />
          <div className="w-full lg:w-1/2">
            <ProductDetails
              product={product?.data}
              productPrice={productPrice?.data[0]?.productPrice?.current?.text!}
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
        </Suspense>
      </div>
      {!!alsoLikeData?.data?.data?.length && (
        <ProductGrid
          title="You might also like"
          products={alsoLikeData.data.data}
        />
      )}
      {!!buyLookData?.data?.data?.products?.length && (
        <ProductGrid
          title="Buy the look"
          products={buyLookData.data.data.products}
        />
      )}
    </motion.div>
  );
};
