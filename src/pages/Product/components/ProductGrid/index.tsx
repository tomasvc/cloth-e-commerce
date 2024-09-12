import { Product } from "../../types";

type Props = {
  title: string;
  products: Product[];
};

export const ProductGrid = ({ title, products }: Props) => {
  return (
    <div className="border-t my-10 font-['Oswald']">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-20">
        <h3 className="text-xl text-gray-800 font-bold uppercase tracking-wider mb-4">
          {title}
        </h3>
        <div className="flex gap-y-10 flex-wrap">
          {products?.map((item: any, index: number) => {
            return (
              <a
                key={index}
                href={`/product/${item.id}`}
                className="w-1/2 sm:w-1/3 lg:w-1/6 h-auto p-2.5 sm:hover:shadow-lg sm:hover:cursor-pointer sm:hover:scale-105 transition-all ease-out"
              >
                <img
                  src={`https://${item.imageUrl || ""}`}
                  alt={item.name}
                  className="w-full h-auto"
                />
                <p className="pt-2 font-light text-lg truncate">{item.name}</p>
                <div>
                  <p className="font-medium">{item.price.current.text}</p>
                  <p className="text-gray-400 font-light line-through">
                    {item.price.previous && item.price.previous.text}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
