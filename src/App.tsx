import { Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AppProvider } from "providers/app";
import { Home } from "pages/Home";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { Cart } from "pages/Cart";
import { Checkout } from "pages/Checkout";
import { Favorites } from "pages/Favorites";
import { Login } from "pages/Login";
import { Register } from "pages/Register";
import { ProductList } from "pages/ProductList";
import { Product } from "pages/Product";
import { Profile } from "pages/Profile";
import { SuccessfulPayment } from "pages/SuccessfulPayment";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const AnimatedWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const App = () => {
  const location = useLocation();

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header key="header" />

        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedWrapper>
                <Home />
              </AnimatedWrapper>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <AnimatedWrapper>
                <Login />
              </AnimatedWrapper>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <AnimatedWrapper>
                <Register />
              </AnimatedWrapper>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <AnimatedWrapper>
                <Profile />
              </AnimatedWrapper>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <AnimatedWrapper>
                <Cart />
              </AnimatedWrapper>
            }
          ></Route>
          <Route
            path="/checkout"
            element={
              <AnimatedWrapper>
                <Checkout />
              </AnimatedWrapper>
            }
          ></Route>
          <Route
            path="/favorites"
            element={
              <AnimatedWrapper>
                <Favorites />
              </AnimatedWrapper>
            }
          ></Route>
          <Route
            path="/order/success"
            element={
              <AnimatedWrapper>
                <SuccessfulPayment />
              </AnimatedWrapper>
            }
          ></Route>
          <Route
            path="/products/:categoryId"
            element={
              <AnimatedWrapper>
                <ProductList />
              </AnimatedWrapper>
            }
          ></Route>
          <Route
            path="/product/:productId"
            element={
              <AnimatedWrapper>
                <Product />
              </AnimatedWrapper>
            }
          ></Route>
        </Routes>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
