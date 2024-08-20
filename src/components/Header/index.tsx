import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { RootState } from "../../store";
import { CategoriesMenu } from "./CategoriesMenu";
import { FaBars } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "./Search";

import { CategoriesMenuMobile } from "./CategoriesMenuMobile";

type HeaderProps = {
  backgroundColor?: string;
};

export const Header: React.FC = ({ backgroundColor }: HeaderProps) => {
  const history = useHistory();

  const user = useSelector((state: RootState) => state.user);
  const [menuState, setMenuState] = useState({
    mensMenu: false,
    womensMenu: false,
    mobileMenu: false,
  });

  return (
    <div
      className={`fixed top-0 w-full font-['Oswald'] ${
        backgroundColor ? backgroundColor : "bg-slate-800"
      } backdrop-blur-sm flex lg:flex-col justify-center z-30`}
    >
      <div className="max-w-7xl w-full px-4 md:px-8 mx-auto flex justify-between">
        <nav
          className="w-full flex justify-between items-center"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="flex items-center gap-4 w-4/5">
            <FaBars
              className="md:hidden cursor-pointer w-6 h-6 text-white drop-shadow"
              onClick={() =>
                setMenuState((prevState) => ({
                  ...prevState,
                  mobileMenu: !prevState.mobileMenu,
                }))
              }
            />
            <div>
              <Link to="/">
                <h3 className="py-3.5 md:py-0 text-white text-2xl uppercase font-bold tracking-widest">
                  Cloth
                </h3>
              </Link>
            </div>
            <div className="hidden md:flex mx-6 text-white font-medium">
              <button
                onMouseEnter={() =>
                  setMenuState((prevState) => ({
                    ...prevState,
                    womensMenu: true,
                  }))
                }
                onMouseLeave={() =>
                  setMenuState((prevState) => ({
                    ...prevState,
                    womensMenu: false,
                  }))
                }
                className={`px-6 py-5 tracking-widest text-sm uppercase transition ease-out ${
                  menuState.womensMenu && "bg-[#ce6858]"
                }`}
              >
                Women
              </button>
              <button
                onMouseEnter={() =>
                  setMenuState((prevState) => ({
                    ...prevState,
                    mensMenu: true,
                  }))
                }
                onMouseLeave={() =>
                  setMenuState((prevState) => ({
                    ...prevState,
                    mensMenu: false,
                  }))
                }
                className={`px-8 py-5 tracking-widest text-sm uppercase transition ease-out ${
                  menuState.mensMenu && "bg-[#708B75]"
                }`}
              >
                Men
              </button>
            </div>
            <Search />
          </div>

          <div className="flex items-center gap-8 text-white drop-shadow-sm">
            <button className="flex" onClick={() => history.push("/cart")}>
              <BsCart2 className="w-5 h-5" />
            </button>
            <button
              className="flex items-center gap-2"
              onClick={() =>
                !user.user ? history.push("/login") : history.push("/profile")
              }
            >
              <AiOutlineUser className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </div>
      <div
        onMouseEnter={() =>
          menuState.mensMenu
            ? setMenuState((prevState) => ({ ...prevState, mensMenu: true }))
            : setMenuState((prevState) => ({ ...prevState, womensMenu: true }))
        }
        onMouseLeave={() =>
          menuState.mensMenu
            ? setMenuState((prevState) => ({ ...prevState, mensMenu: false }))
            : setMenuState((prevState) => ({ ...prevState, womensMenu: true }))
        }
      >
        <CategoriesMenu
          openMen={menuState.mensMenu}
          openWomen={menuState.womensMenu}
        />
      </div>
      <AnimatePresence>
        {menuState.mobileMenu && (
          <motion.div
            className="w-full absolute left-0 top-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 55 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ ease: "anticipate", duration: 0.4 }}
          >
            <CategoriesMenuMobile CategoriesMenu={CategoriesMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
