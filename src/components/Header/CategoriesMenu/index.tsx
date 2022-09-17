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
import { MdClose } from "react-icons/md";

import { Menu } from "./styles";

export const CategoriesMenu: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
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
    setOpen(false);
    history.push("/products");
  };

  return (
    <Menu className="categories" visibility={open ? "visible" : "hidden"}>
      <ul className="categories__ul">
        {categories &&
          categories.categories &&
          categories.categories.length &&
          categories?.categories?.map((item: any) => {
            return (
              <li
                className="ul__category"
                onClick={() => handleSelect(item.id, item.name)}
                key={item.id}
              >
                {item.name}
              </li>
            );
          })}
      </ul>
      <MdClose
        className="categories__closeBtn"
        onClick={() => setOpen(false)}
      />
    </Menu>
  );
};
