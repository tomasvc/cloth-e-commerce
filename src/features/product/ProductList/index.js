import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, CircularProgress } from "@mui/material";
import { fetchProductsByCategoryId } from "../productSlice";
import ListItem from "../ProductListItem";
import "./styles.css";

export default function ProductList() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProductsByCategoryId({ page: 1, category: products?.categoryId })
    );
  }, [dispatch]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handlePageChange = (page) => {
    dispatch(
      fetchProductsByCategoryId({ page, category: products?.categoryId })
    );
    window.scrollTo(0, 0);
  };

  return (
    <div className="product-list">
      {/* <div className="product-list__filter">
        <select
          className="filter__item"
          placeholder="Category"
          name="category"
          value="Category"
        >
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Unisex">Unisex</option>
        </select>
        <select
          className="filter__item"
          placeholder="Brand"
          name="brand"
          value="Brand"
        >
          <option value="ASOS">ASOS</option>
          <option value="Calvin Klein">Calvin Klein</option>
        </select>
        <select
          className="filter__item"
          placeholder="Brand"
          name="brand"
          value="Brand"
        >
          <option value="ASOS">ASOS</option>
          <option value="Calvin Klein">Calvin Klein</option>
        </select>
        <select
          className="filter__item"
          placeholder="Brand"
          name="brand"
          value="Brand"
        >
          <option value="ASOS">ASOS</option>
          <option value="Calvin Klein">Calvin Klein</option>
        </select>
      </div> */}

      {products?.loading ? (
        <CircularProgress
          sx={{ margin: "10rem auto", position: "relative" }}
        />
      ) : (
        <>
          <h1 style={{ margin: '2rem auto', fontWeight: 300 }}>{products?.categoryName}</h1>
          <ul className="product-list__list">
            {products?.products?.map((product) => {
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
