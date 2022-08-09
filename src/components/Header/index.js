import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import { AiOutlineUser } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import Categories from '../../features/category/Category'
import axios from "axios";

import "./styles.css";

export default function Header() {

  const history = useHistory()

  const user = useSelector(state => state.user)
  const [results, setResults] = useState(null);
  const [query, setQuery] = useState("");

  const API_KEY = "78a110ed1dmshbcfebcdca14633ap13f5ffjsn7c75c6dcf1c0";

  const options = {
    method: "GET",
    url: "https://asos2.p.rapidapi.com/products/v2/list",
    params: {
      store: "US",
      offset: "0",
      categoryId: "4209",
      limit: "10",
      country: "UK",
      range: "new_season",
      sort: "freshness",
      currency: "USD",
      sizeSchema: "US",
      lang: "en-US",
      q: query,
    },
    headers: {
      "x-rapidapi-host": "asos2.p.rapidapi.com",
      "x-rapidapi-key": API_KEY,
    },
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const showResults = (val) => {
    let res = document.getElementById("results");
    if (res) {
      res.innerHTML = "";
      let list = "";
      for (let i = 0; i < val?.length; i++) {
        list += "<li>" + val[i]?.name + "</li>";
      }
      res.innerHTML = "<ul>" + list + "</ul>";
    }
  };

  useEffect(() => {
    query !== "" &&
      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          setResults(response.data.products);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [query]);

  useEffect(() => {
    showResults(results);
  }, [results]);

  return (
    <>
      <div className="header">
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
            <div className="left__input">
              <form autoComplete="off">
                <input
                  onChange={handleChange}
                  className="input"
                  type="text"
                  placeholder="Search for items and brands"
                />
                <div id="results" style={{ visibility: query ? 'visible' : 'hidden' }}></div>
              </form>
            </div>
          </div>
          <div className="navbar__right">
            <button
              className="right__cart"
              onClick={() =>
                history.push('/cart')
              }
            >
              <BsCart2 />
            </button>
            <button
              className="right__user"
              onClick={() =>
                !user
                  ? history.push('/login')
                  : history.push('/profile')
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
      </div>
      <Categories />
    </>
  );
}
