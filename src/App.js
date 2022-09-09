import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from 'pages/Home'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Cart from 'pages/Cart'
import Login from 'pages/Login'
import Register from 'pages/Register'
import ProductList from 'pages/ProductList'
import Product from 'pages/ProductItem'
import Profile from 'pages/Profile'


function App() {

  return (
      <Router>

        <div className="App">

          <Header />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/product/:productId" component={Product} />
          </Switch>

          <Footer />

        </div>

      </Router>
  );
}

export default App;
