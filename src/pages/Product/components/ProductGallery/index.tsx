import { Product } from "../../types";
import { useState } from "react";

type Props = {
  product: Product;
};

export const ProductGallery = ({ product }: Props) => {
  const [image, setImage] = useState<string>(
    product.media?.images?.[0]?.url || ""
  );

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-2 w-full sm:w-1/2 mx-auto h-auto">
      <div className="flex flex-row lg:flex-col gap-2">
        {product?.media?.images?.map((image: any) => {
          return (
            <img
              key={image.type}
              src={"https://" + image.url}
              onClick={() => setImage(image.url)}
              className="cursor-pointer hover:opacity-80 transparent-all ease-in"
              alt={product.name}
              width="50"
              height="50"
            />
          );
        })}
      </div>
      <img
        className="w-full h-auto"
        src={"https://" + image}
        alt={product?.name}
      />
    </div>
  );
};
