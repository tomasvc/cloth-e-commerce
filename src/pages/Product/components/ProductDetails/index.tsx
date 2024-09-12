import { Product } from "../../types";
import { IoMdStar, IoMdStarOutline, IoMdStarHalf } from "react-icons/io";

type Props = {
  product: Product;
  productPrice: string;
  setSelectedSize: (size: string) => void;
  size: string | "";
};

export const ProductDetails = ({
  product,
  productPrice,
  setSelectedSize,
  size,
}: Props) => {
  const color = product?.media?.images?.[0]?.colour || "N/A";

  const rating = product.rating?.averageOverallStarRating ?? 0;

  const stars = Array(5)
    .fill(null)
    .map((_, i) =>
      i < Math.floor(rating) ? "full" : i < Math.ceil(rating) ? "half" : "empty"
    );

  const starIcons = {
    full: <IoMdStar size={25} />,
    half: <IoMdStarHalf size={25} />,
    empty: <IoMdStarOutline size={25} />,
  };

  return (
    <div className="max-w-lg md:max-w-auto mx-auto">
      <p className="uppercase text-sm tracking-widest font-light">
        {product?.pdpLayout + " — " + product?.productType?.name}
      </p>
      <h3 className="text-3xl font-light pt-1 pb-4" id="product-name">
        {product?.name}
      </h3>
      <div className="flex items-end gap-2">
        <p className="text-xl font-medium">{productPrice}</p>
      </div>
      {product?.rating && (
        <div className="flex flex-col mt-2 mb-4 hover:cursor-pointer w-fit">
          <div className="flex gap-0.5">
            {stars.map((star, index) => (
              <span key={index}>{starIcons[star]}</span>
            ))}
          </div>
          <p className="pt-1 pl-1 text-gray-500 text-xs">
            {product?.rating?.totalReviewCount}
            {product?.rating?.totalReviewCount === 1 ? " rating" : " ratings"}
          </p>
        </div>
      )}
      <div className="flex gap-6 mt-6">
        <div>
          <p className="text-xl">{product?.gender}</p>
          <p className="font-roboto uppercase text-xs font-bold tracking-wide">
            Gender
          </p>
        </div>
        <div>
          <p className="text-xl">{color}</p>
          <p className="font-roboto uppercase text-xs font-bold tracking-wide">
            Color
          </p>
        </div>
      </div>
      <div
        className="my-6 font-roboto font-light text-sm"
        dangerouslySetInnerHTML={{
          __html: product?.description || "",
        }}
      ></div>
      {product?.variants?.length! > 1 && (
        <div className="w-1/3 my-2 border font-roboto">
          <select
            className="w-full"
            onChange={(e) => {
              setSelectedSize(e.target.value);
            }}
            value={size}
          >
            {product?.variants?.map((variant: any, index: number) => (
              <option
                key={index}
                disabled={!variant?.isAvailable}
                className="w-full"
                value={variant?.brandSize}
              >
                {variant?.brandSize}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
