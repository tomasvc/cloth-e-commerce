import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, CircularProgress } from "@mui/material";
import { fetchProductsByCategoryId } from "slices/productSlice";
import { RootState } from "store";
import { ListItem } from "components/ProductListItem";
import { List } from "./styles";

interface IProduct {
  id: number;
  name: string;
  gender: string;
  color: string;
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
  };
}



export const ProductList: React.FC = () => {
  const [windowSize, setWindowSize] = useState(0);
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(window.innerWidth)
    })

    return () => {
      window.removeEventListener('resize', () => {
        return window.innerWidth
      })
    }
  }, [])

  useEffect(() => {
    dispatch(
      fetchProductsByCategoryId({
        page: 1,
        category: products?.categoryId.toString(),
      })
    );
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(
      fetchProductsByCategoryId({
        page,
        category: products?.categoryId.toString(),
      })
    );
    window.scrollTo(0, 0);
  };

  return (
    <List className="product-list">
      {products?.loading ? (
        <CircularProgress sx={{ margin: "10rem auto", position: "relative" }} />
      ) : (
        <>
          <h1 style={{ margin: "2rem auto", fontWeight: 300 }}>
            {products?.categoryName}
          </h1>

          {products?.products?.length ? (
            <ul className="product-list__list">
              {products?.products?.map((product: IProduct) => {
                return (
                  <ListItem
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price.current.text}
                    image={product.imageUrl}
                  />
                );
              })}
            </ul>
          ) : (
            <p className="product-list__not-found">No items found</p>
          )}
        </>
      )}

      {products?.products?.length && (
        <Pagination
          sx={{ margin: "auto", mb: 4 }}
          count={windowSize < 600 ? 5 : 10}
          onChange={(event, page) => handlePageChange(page)}
        />
      )}
    </List>
  );
};
