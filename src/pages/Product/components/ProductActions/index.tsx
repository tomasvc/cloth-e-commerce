import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Product } from "../../types";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "store";

type Props = {
  product: Product;
  handleAddToCart: (product: Product) => void;
  handleAddToFavorites: (product: Product) => void;
  fillHeart: boolean;
};

export const ProductActions = ({
  product,
  handleAddToCart,
  handleAddToFavorites,
  fillHeart,
}: Props) => {
  const history = useHistory();
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className="max-w-lg md:max-w-auto mx-auto flex items-center gap-4 pt-8">
      <button
        className="text-sm uppercase bg-gray-800 text-white px-6 py-3 rounded hover:sm:bg-amber-600 transition ease-out"
        title="Add to cart"
        disabled={!product.isInStock}
        onClick={() =>
          user?.user ? handleAddToCart(product) : history.push("/login")
        }
      >
        {product.isInStock ? "Add to cart" : "Out of stock"}
      </button>
      <button
        className="w-12 h-12 rounded-full bg-gray-100 flex justify-center items-center hover:scale-110 transition ease-out"
        onClick={() =>
          user.user ? handleAddToFavorites(product) : history.push("/login")
        }
      >
        {fillHeart ? (
          <AiFillHeart className="w-6 h-6" />
        ) : (
          <AiOutlineHeart className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};
