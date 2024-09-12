import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCategoryId, updateCategoryName } from "slices/productSlice";
import { getProductListById } from "api/getProductListById";
import { useCategories } from "hooks/useCategories";

import { GenericCategory } from "./GenericCategory";
import { motion, AnimatePresence } from "framer-motion";

type CategoriesMenuProps = {
  openMen: boolean;
  openWomen: boolean;
};

export const CategoriesMenu: React.FC<CategoriesMenuProps> = ({
  openMen,
  openWomen,
}) => {
  const { men: categoriesMen, women: categoriesWomen } = useCategories();
  const [selectedMenu, setSelectedMenu] = useState("Sale");
  const dispatch = useDispatch();

  const handleSelect = (id: string, title: string) => {
    try {
      getProductListById({ page: 1, categoryId: id });
      dispatch(updateCategoryId(id));
      dispatch(updateCategoryName(title));
      window.location.href = "/products/" + id;
    } catch (error) {
      console.log(error);
    }
  };

  let mensCategoryIndexMap = new Map();
  let womensCategoryIndexMap = new Map();

  categoriesMen?.subcategories?.forEach((item: any, index: number) => {
    mensCategoryIndexMap.set(item.title, index);
  });

  categoriesWomen?.subcategories?.forEach((item: any, index: number) => {
    womensCategoryIndexMap.set(item.title, index);
  });

  const renderSelectedComponent = (categories: any) => {
    const specialComponentsMap: any = {};

    const Component = specialComponentsMap[selectedMenu];

    if (Component) {
      return <Component categories={categories} onSelect={handleSelect} />;
    }

    let index = null;

    if (openMen) {
      index = mensCategoryIndexMap.get(selectedMenu);
    } else if (openWomen) {
      index = womensCategoryIndexMap.get(selectedMenu);
    }

    if (index !== null && index !== undefined) {
      return (
        <GenericCategory
          categories={categories}
          onSelect={handleSelect}
          index={index}
        />
      );
    }

    return null;
  };

  return (
    <AnimatePresence>
      {openMen && (
        <motion.div
          className="fixed bg-[#708B75] top-0 mt-20 md:mt-10 left-0 w-full h-screen md:h-[40rem] overflow-y-auto z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "anticipate", duration: 0.4 }}
        >
          <div className="w-full py-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/5">
              <ul className="flex flex-row md:flex-col flex-wrap">
                {categoriesMen?.subcategories?.map((item: any) => {
                  return (
                    <li className="w-1/2 md:w-full" key={item?.title}>
                      <button
                        onMouseEnter={() => setSelectedMenu(item?.title)}
                        className={`w-full text-white text-left text-lg md:text-sm hover:bg-white hover:text-gray-900 font-light px-4 md:px-6 py-2 transition-all ease-out ${
                          item?.title === selectedMenu &&
                          "bg-white !text-gray-900"
                        }`}
                      >
                        {item?.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            {renderSelectedComponent(categoriesMen)}
          </div>
        </motion.div>
      )}
      {openWomen && (
        <motion.div
          className="fixed bg-[#ce6858] top-0 mt-20 md:mt-10 left-0 w-full h-screen md:h-[40rem] overflow-y-auto z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "anticipate", duration: 0.4 }}
        >
          <div className="w-full py-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/5">
              <ul className="flex flex-row md:flex-col flex-wrap">
                {categoriesWomen?.subcategories?.map((item: any) => {
                  return (
                    <li className="w-1/2 md:w-full" key={item?.title}>
                      <button
                        onMouseEnter={() => setSelectedMenu(item?.title)}
                        className={`w-full text-white text-left text-lg md:text-sm hover:bg-white hover:text-gray-900 font-light px-4 md:px-6 py-2 transition-all ease-out ${
                          item?.title === selectedMenu &&
                          "bg-white !text-gray-900"
                        }`}
                      >
                        {item?.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            {renderSelectedComponent(categoriesWomen)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
