import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination, CircularProgress } from "@mui/material";
import { ListItem } from "components/ProductListItem";
import { motion } from "framer-motion";
import { useProductList } from "api/getProductListById";

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
  const [windowSize, setWindowSize] = useState(0);
  const [page, setPage] = useState(1);

  const { categoryId } = useParams<IDParams>();

  const {
    data: productList,
    isLoading,
    isError,
  } = useProductList({
    page,
    categoryId,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        return window.innerWidth;
      });
    };
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center m-auto">
          <CircularProgress />
        </div>
      ) : isError ? (
        <p>Error</p>
      ) : (
        <div className="font-['Oswald'] pt-14 max-w-7xl w-full mx-auto px-2 md:px-6">
          <h1 className="mx-auto my-10 font-light text-4xl text-center">
            {productList?.data?.data?.categoryName}
          </h1>

          {productList && (
            <ul className="grid gap-y-4 grid-cols-2 lg:grid-cols-4 justify-center mx-auto">
              {productList?.data?.data?.products?.map(
                (product: IProduct, id: number) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                    >
                      <ListItem
                        key={id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.imageUrl}
                        isSellingFast={product.isSellingFast}
                      />
                    </motion.div>
                  );
                }
              )}
            </ul>
          )}
        </div>
      )}

      {productList && (
        <Pagination
          className="my-20 flex justify-center"
          count={windowSize < 600 ? 5 : 10}
          page={page}
          onChange={(_, page) => {
            handlePageChange(page);
          }}
        />
      )}
    </div>
  );
};
