import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { fetchCategories } from "slices/categorySlice";
import {
  fetchProductsByCategoryId,
  updateCategoryId,
  updateCategoryName,
} from "slices/productSlice";

import { Menu } from "./styles";

export const Categories: React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => {
    return state.categories;
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSelect = (id: string, name: string) => {
    dispatch(fetchProductsByCategoryId({ page: 1, category: id }));
    dispatch(updateCategoryId(id));
    dispatch(updateCategoryName(name));
    history.push("/products");
  };

  return (
    <Menu className="categories">
      <ul>
        {categories &&
          categories.categories &&
          categories.categories.length &&
          categories?.categories?.map((item: any) => {
            return (
              <li
                onClick={() => handleSelect(item.id, item.name)}
                key={item.id}
              >
                {item.name}
              </li>
            );
          })}
      </ul>
    </Menu>
  );
};
