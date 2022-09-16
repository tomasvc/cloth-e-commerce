import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { RootState } from "../../store";
import Categories from "./Categories";
import { CategoriesMenu } from "./CategoriesMenu";
import Search from "./Search";

import { StyledHeader } from "./styles";

export default function Header() {
  const history = useHistory();

  const user = useSelector((state: RootState) => state.user);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <StyledHeader className="header">
        <nav
          className="header__navbar"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar__left">
            <FaBars className="left__bars" onClick={() => setOpenMenu(!openMenu)} />
            <div className="left__brand">
              <a href="/">
                <h3 className="brand__name">Cloth</h3>
              </a>
            </div>
            <Search />
          </div>
          <div className="navbar__right">
            <button
              className="right__user"
              onClick={() =>
                !user.user ? history.push("/login") : history.push("/profile")
              }
            >
              <div id="user" className="user__user">
                <Link to="/login" className="user__login">
                  {user?.user ? "Hello" : "Sign in"}
                </Link>
              </div>
              <AiOutlineUser />
            </button>
            <button
              className="right__cart"
              onClick={() => history.push("/cart")}
            >
              <BsCart2 />
            </button>
          </div>
        </nav>
      </StyledHeader>
      <Categories />
      <CategoriesMenu open={openMenu} setOpen={setOpenMenu} />
    </>
  );
}
