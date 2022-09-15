import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { RootState } from "../../store";
import Categories from "./Categories";
import Search from "./Search";

import { StyledHeader } from "./styles";

export default function Header() {
  const history = useHistory();

  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <StyledHeader className="header">
        <nav
          className="header__navbar"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar__left">
            {/* <div id="icon" className="navbar__icon" onClick={handleMenuClick}>
                        <span className="icon--1"></span>
                        <span className="icon--2"></span>
                        <span className="icon--3"></span>
                        </div> */}
            <div className="left__brand">
              <a href="/">
                <h3 className="brand__name">Cloth</h3>
              </a>
            </div>
            {/* <div className="left__input">
              <form autoComplete="off">
                <input
                  onChange={handleChange}
                  className="input"
                  type="text"
                  placeholder="Search for items and brands"
                />
                <div
                  id="results"
                  style={{ visibility: query ? "visible" : "hidden" }}
                ></div>
              </form>
            </div> */}
            <Search />
          </div>
          <div className="navbar__right">
            <button
              className="right__cart"
              onClick={() => history.push("/cart")}
            >
              <BsCart2 />
            </button>
            <button
              className="right__user"
              onClick={() =>
                !user.user ? history.push("/login") : history.push("/profile")
              }
            >
              <AiOutlineUser />
              <div id="user" className="user__user">
                <Link to="/login" className="user__login">
                  {user ? "Log in" : "Log out"}
                </Link>
              </div>
            </button>
          </div>
        </nav>
      </StyledHeader>
      <Categories />
    </>
  );
}
