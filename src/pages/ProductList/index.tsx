import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination, CircularProgress } from "@mui/material";
import { ListItem } from "components/ProductListItem";
import { motion } from "framer-motion";
import { useProductList } from "api/getProductListById";
import { useDispatch } from "react-redux";
import { resetSelectedProduct } from "slices/productSlice";

interface IProduct {
  id: number;
  name: string;
  gender: string;
  color: string;
  isSellingFast: boolean;
  imageUrl: string;
  images: Array<any>;
  media: {
    images: Array<any>;
  };
  price: {
    current: {
      value: number;
      text: string;
    };
    previous: {
      value: number;
      text: string;
    };
  };
}

type IDParams = {
  categoryId: string;
};

export const ProductList: React.FC = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [page, setPage] = useState(1);

  const { categoryId = "" } = useParams<IDParams>();
  const paginationCount = windowSize < 600 ? 5 : 10;
  const dispatch = useDispatch();

  const {
    data: productList,
    isLoading,
    isError,
  } = useProductList({
    page,
    categoryId,
  });

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center m-auto">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <div>
      <div className="font-['Oswald'] pt-14 max-w-7xl w-full mx-auto px-2 md:px-6">
        <h1 className="mx-auto my-10 font-light text-4xl text-center">
          {productList?.data?.data?.categoryName}
        </h1>

        {productList && (
          <ul className="grid gap-y-4 grid-cols-2 md:grid-cols-4 justify-center mx-auto">
            {productList.data.data.products.map((product: IProduct) => (
              <li key={product.id}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                >
                  <ListItem
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.imageUrl}
                    isSellingFast={product.isSellingFast}
                    onItemClick={() => dispatch(resetSelectedProduct())}
                  />
                </motion.div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {productList && (
        <Pagination
          className="my-20 flex justify-center"
          count={paginationCount}
          page={page}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};
