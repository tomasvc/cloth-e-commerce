import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchResults } from "api/getSearchResults";
import { useDebounce } from "use-debounce";
import { CircularProgress } from "@mui/material";

export const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [debouncedValue] = useDebounce(query, 500);
  const {
    data: results,
    isLoading,
    error,
  } = useSearchResults({ query: debouncedValue });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleLinkClick = () => {
    setQuery("");
  };

  return (
    <div className="relative w-full hidden md:block">
      <form autoComplete="off">
        <input
          onChange={handleInputChange}
          className="bg-white/20 text-white placeholder-white text-sm px-4 py-2 block w-full"
          type="text"
          placeholder="Search for items and brands"
        />
        {query.length > 0 && (
          <div className="absolute bg-[#4b5462] text-white font-roboto text-sm p-2 pt-4 rounded-br rounded-bl w-full">
            {isLoading ? (
              <div className="flex flex-center items-center w-full py-4">
                <CircularProgress className="mx-auto" />
              </div>
            ) : error ? (
              <p className="text-white">An error occurred</p>
            ) : results?.products.length ? (
              <ul className="flex flex-col gap-1 w-full">
                {results.products.map((item: any) => (
                  <li className="w-full" key={item.id}>
                    <Link
                      to={`/product/${item.id}`}
                      onClick={handleLinkClick}
                      className="hover:bg-slate-700 px-3 py-2.5 rounded-lg block w-full"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://${item.imageUrl}`}
                          alt={item.name}
                          width={20}
                          height="auto"
                          className="rounded"
                        />
                        <span className="truncate">{item.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white">
                No results found with query '{query}'
              </p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};
