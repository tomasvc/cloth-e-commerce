import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { FavoriteItem } from "components/FavoriteItem";
import { StyledFavorites } from "./styles";

type FavoritesItemProps = {
  id: string;
  name: string;
  gender: string;
  color: string;
  images: Array<any>;
  price: number;
};

export const Favorites: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.cart);

  return (
    <StyledFavorites className="favorites">
      <h1 className="favorites__label">Favorites</h1>
      <div className="favorites__wrapper">
        {favorites?.favoriteItems?.length ? (
          <>
            <div className="favorites__items">
              {favorites?.favoriteItems?.map((favoritesItem: FavoritesItemProps, id: number) => {
                return <FavoriteItem key={id} {...favoritesItem} />;
              })}
            </div>
          </>
        ) : (
          <div className="favorites__empty">
            <h3 className="favorites__title">Your favorites list is empty</h3>
            <a href="/products" className="buttons__continueBtn">
              Continue shopping
            </a>
          </div>
        )}
      </div>
    </StyledFavorites>
  );
};
