import React, { useEffect, useRef, useState } from "react";
import { SearchMobile } from "../SearchMobile";

export const CategoriesMenuMobile: React.FC<{
  CategoriesMenu: React.ComponentType<{ openMen: boolean; openWomen: boolean }>;
}> = ({ CategoriesMenu }) => {
  const [openMen, setOpenMen] = useState(false);
  const [openWomen, setOpenWomen] = useState(false);

  const prevOpenMenRef = useRef(openMen);
  const prevOpenWomenRef = useRef(openWomen);

  useEffect(() => {
    const prevOpenMen = prevOpenMenRef.current;
    const prevOpenWomen = prevOpenWomenRef.current;

    if (openMen && openWomen) {
      if (openMen !== prevOpenMen) {
        setOpenWomen(false);
      } else if (openWomen !== prevOpenWomen) {
        setOpenMen(false);
      }
    }

    prevOpenMenRef.current = openMen;
    prevOpenWomenRef.current = openWomen;
  }, [openMen, openWomen]);

  return (
    <div className="bg-slate-900/80 w-screen h-screen">
      <div className="bg-slate-800 text-white w-full p-4 flex flex-col gap-2 items-start">
        <button
          className="text-2xl uppercase"
          onClick={() => setOpenMen(!openMen)}
        >
          Men
        </button>
        <button
          className="text-2xl uppercase"
          onClick={() => setOpenWomen(!openWomen)}
        >
          Women
        </button>
        <CategoriesMenu openMen={openMen} openWomen={openWomen} />
        <SearchMobile />
      </div>
    </div>
  );
};
