import { Route, Switch, useLocation } from "react-router-dom";
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

const AnimatedRoute = ({ children, ...props }: any) => {
  return (
    <Route {...props}>
      {({ match }) =>
        match && (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )
      }
    </Route>
  );
};

const App = () => {
  const location = useLocation();

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header key="header" />

        <Switch location={location} key={location.pathname}>
          <AnimatedRoute exact path="/">
            <Home />
          </AnimatedRoute>
          <AnimatedRoute exact path="/login">
            <Login />
          </AnimatedRoute>
          <AnimatedRoute exact path="/register">
            <Register />
          </AnimatedRoute>
          <AnimatedRoute exact path="/profile">
            <Profile />
          </AnimatedRoute>
          <AnimatedRoute exact path="/cart">
            <Cart />
          </AnimatedRoute>
          <AnimatedRoute exact path="/checkout">
            <Checkout />
          </AnimatedRoute>
          <AnimatedRoute exact path="/favorites">
            <Favorites />
          </AnimatedRoute>
          <AnimatedRoute exact path="/order/success">
            <SuccessfulPayment />
          </AnimatedRoute>
          <AnimatedRoute exact path="/products/:categoryId">
            <ProductList />
          </AnimatedRoute>
          <AnimatedRoute exact path="/product/:productId">
            <Product />
          </AnimatedRoute>
        </Switch>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
