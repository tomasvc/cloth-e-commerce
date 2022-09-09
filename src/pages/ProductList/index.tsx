import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, CircularProgress } from "@mui/material";
import { fetchProductsByCategoryId } from "../../slices/productSlice";
import { RootState } from "../../store";
import ListItem from "../../components/ProductListItem";
import "./styles.css";

export default function ProductList() {
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProductsByCategoryId({ page: 1, category: products?.categoryId })
    );
  }, [dispatch]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handlePageChange = (page: number) => {
    dispatch(
      fetchProductsByCategoryId({ page, category: products?.categoryId })
    );
    window.scrollTo(0, 0);
  };

  return (
    <div className="product-list">
      {products?.loading ? (
        <CircularProgress
          sx={{ margin: "10rem auto", position: "relative" }}
        />
      ) : (
        <>
          <h1 style={{ margin: '2rem auto', fontWeight: 300 }}>{products?.categoryName}</h1>
          <ul className="product-list__list">
            {products?.products?.map((product: any) => {
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
        </>
      )}

      <Pagination
        sx={{ margin: "auto", mb: 4 }}
        // page={currentPage}
        count={10}
        onChange={(event, page) => handlePageChange(page)}
      />
    </div>
  );
}
