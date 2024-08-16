import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);

type CheckoutButtonProps = {
  cart?: any;
};

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BACKEND_URL
    : process.env.REACT_APP_BACKEND_URL;

export const CheckoutButton = ({ cart }: CheckoutButtonProps) => {
  const handleClick = async (event: { preventDefault: () => void }) => {
    const stripe = await stripePromise;

    const response = await fetch(`${API_URL}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems: cart,
      }),
    });

    const session = await response.json();

    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error("Stripe Checkout Error:", error);
      }
    }
  };

  return (
    <button
      role="link"
      className="text-sm uppercase bg-gray-800 text-white py-3 rounded mt-2 hover:sm:bg-amber-600 transition ease-out"
      onClick={handleClick}
    >
      Continue to checkout
    </button>
  );
};
