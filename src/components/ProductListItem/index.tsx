import React from "react";

type ItemProps = {
  id: number;
  image: string;
  name: string;
  price: {
    current: {
      value: number;
      text: string;
    };
    previous: {
      value: number;
      text: string;
    };
  };
  isSellingFast: boolean;
  onItemClick: () => void;
};

export const ListItem: React.FC<ItemProps> = React.memo((props: ItemProps) => {
  return (
    <a onClick={props.onItemClick} href={"/product/" + props.id}>
      <div className="flex flex-col text-gray-800 h-full p-2.5 sm:hover:shadow-lg sm:hover:cursor-pointer sm:hover:scale-105 transition-all ease-out">
        <img src={"https://" + props.image} alt={props.name} />
        <div className="h-full flex flex-col justify-between gap-2 pt-1.5">
          <p className="md:text-xl font-light overflow-hidden overflow-ellipsis">
            {props.name}
          </p>
          <div className="flex flex-col-reverse md:flex-row gap-0 md:gap-1 items-start md:items-end">
            <p className="text-xl font-medium">{props.price.current.text}</p>
            <p className="text-gray-400 text-sm line-through pb-[0.15rem]">
              {props.price.previous.text}
            </p>
            {props.isSellingFast && (
              <p className="text-xs text-gray-500 tracking-wide pb-[4px]">
                Selling fast
              </p>
            )}
          </div>
        </div>
      </div>
    </a>
  );
});
