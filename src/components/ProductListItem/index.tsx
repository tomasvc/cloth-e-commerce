import React from "react";
import { Item } from "./styles";

type ItemProps = {
  id: number;
  image: string;
  name: string;
  price: string;
};

export const ListItem: React.FC<ItemProps> = (props: ItemProps) => {
  return (
    <Item className="list__item">
      <div className="item__top">
        <a href={"/product/" + props.id}>
          <img
            className="top__image"
            src={"https://" + props.image}
            alt={props.name}
          />
        </a>
      </div>
      <div className="item__info">
        <a href={"/product/" + props.id}>
          <p className="info__title">{props.name}</p>
        </a>
        <div className="info__bottom">
          <p className="bottom__price">{props.price}</p>
        </div>
      </div>
    </Item>
  );
};
