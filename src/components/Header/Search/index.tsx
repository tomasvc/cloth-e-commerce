import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { RootState } from "store";
import { updateResults, clearResults } from "slices/searchSlice";
import { Searchbar } from "./styles";
import axios from "axios";

const API_KEY = "78a110ed1dmshbcfebcdca14633ap13f5ffjsn7c75c6dcf1c0";

export default function Search() {
  const [query, setQuery] = useState("");
  const results = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  //   const showResults = (val: any) => {
  //     let res = document.getElementById("results");
  //     if (res) {
  //       res.innerHTML = "";
  //       let list = "";
  //       for (let i = 0; i < val?.length; i++) {
  //         list += "<li>" + val[i]?.name + "</li>";
  //       }
  //       res.innerHTML = "<ul>" + list + "</ul>";
  //     }
  //   };

  const getResults = (options: any) => {
    query !== ""
      ? axios
          .request(options)
          .then((response) => {
            console.log(response.data);
            dispatch(updateResults(response.data.products));
          })
          .catch((error) => {
            console.log(error);
          })
      : dispatch(clearResults());
  };

  const handleClearInputAndResults = () => {
    setQuery("");
    dispatch(clearResults());
  };

  useEffect(() => {
    getResults(options);
  }, [query]);

  useEffect(() => {
    // showResults(results);
    console.log(results);
  }, [results]);

  return (
    <Searchbar className="left__input">
      <form autoComplete="off">
        <input
          onChange={handleChange}
          className="input"
          type="text"
          placeholder="Search for items and brands"
        />
        <div id="results" style={{ visibility: query ? "visible" : "hidden" }}>
          <ul>
            {results?.loading && <li>Loading...</li>}
            {results?.results?.length ? (
              results.results.map((item: any, id: number) => {
                return (
                  <li>
                    <Link
                      key={id}
                      to={`/product/${item?.id}`}
                      onClick={handleClearInputAndResults}
                    >
                      {item?.name}
                    </Link>
                  </li>
                );
              })
            ) : (
              <li>No items found with the name '{query}'</li>
            )}
          </ul>
        </div>
      </form>
    </Searchbar>
  );
}
