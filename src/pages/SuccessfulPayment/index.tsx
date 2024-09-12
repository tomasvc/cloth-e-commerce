import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MainLayout } from "components/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "slices/cartSlice";
import { RootState } from "store";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BACKEND_URL
    : "http://localhost:4242";

export const SuccessfulPayment = () => {
  const searchParams = useLocation().search;
  const session_id = new URLSearchParams(searchParams).get("session_id");
  const [session, setSession] = useState<any>(null);

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(
          `${API_URL}/order/success?session_id=${session_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session_id,
            }),
          }
        );
        if (!response.ok) {
          console.log(response);
          throw new Error("Failed to retrieve session");
        }
        const sessionData = await response.json();
        setSession(sessionData);
        dispatch(clearCart());
      } catch (error) {
        console.error(error);
      }
    };

    if (session_id) {
      fetchSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session_id]);

  if (!session) return <div>Loading...</div>;

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center min-h-screen max-w-7xl mx-auto px-4 md:px-8 pb-10 mt-16 bg-gray-50 font-['Oswald']">
        <div className="justify-self-center -mt-12">
          <h2 className="text-4xl mb-4">Payment Successful!</h2>
          <div className="font-roboto text-sm lg:text-lg flex flex-col gap-4">
            <p>
              Thanks for your order
              {user?.user?.displayName ? ", " + user?.user?.displayName : ""}.
              Your payment of ${session.session.amount_total.toFixed(2)} has
              been processed.
            </p>
            <p className="leading-8">
              Your order number is{" "}
              <strong className="font-semibold bg-slate-200 px-2 py-1 rounded break-all">
                {session.session.id}
              </strong>
              . A confirmation email has been sent to{" "}
              <strong className="font-semibold bg-slate-200 px-2 py-1 rounded">
                {session.session.customer_details.email}
              </strong>
            </p>
            <p>
              You will receive a tracking number once your order has been
              shipped.
            </p>
            <p className="mb-8">Please contact us if you have any questions.</p>
          </div>
          <a
            href="/products/27110"
            className="text-sm text-center uppercase text-gray-800 mt-3 px-4 py-2.5 border border-slate-800 rounded hover:sm:bg-slate-100 transition"
          >
            Continue shopping
          </a>
        </div>
      </div>
    </MainLayout>
  );
};
