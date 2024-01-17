import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { FavoriteItem } from "components/FavoriteItem";
import { Link } from "react-router-dom";

type FavoritesItemProps = {
  id: string;
  name: string;
  gender: string;
  color: string;
  images: Array<any>;
  price: number;
  quantity: number;
};

export const Favorites: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto pt-24 px-4 md:px-8">
        {favorites?.items?.length ? (
          <h1 className="font-['Oswald'] text-gray-800 w-fit text-4xl font-medium pb-6 uppercase tracking-widest">
            Favorites
          </h1>
        ) : null}

        <div>
          {favorites?.items?.length ? (
            <>
              <div>
                {favorites?.items?.map(
                  (favoritesItem: FavoritesItemProps, id: number) => {
                    return <FavoriteItem key={id} {...favoritesItem} />;
                  }
                )}
              </div>
            </>
          ) : (
            <div className="font-['Oswald'] flex flex-col justify-center items-center w-full h-screen pb-40">
              <h1 className="text-gray-800 w-fit text-4xl font-medium pb-6 uppercase tracking-widest">
                Favorites
              </h1>
              <h3 className="text-4xl font-light pb-8">
                Your favorites list is empty
              </h3>
              <Link
                to="/products/27110"
                className="w-fit font-['Oswald'] uppercase bg-gray-800 text-white text-center px-12 py-3 rounded mt-2 hover:sm:bg-amber-600 transition ease-out"
              >
                Continue shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
