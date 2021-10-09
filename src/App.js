import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Login from './components/Login'
import Register from './components/Login'
import ProductList from './components/ProductList'
import Product from './components/Product'
import Profile from './components/Profile'


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
