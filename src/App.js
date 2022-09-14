import React from 'react';
import { Navbar, Products, Cart, Checkout } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { products } from './components/Products/Product/ProductData';
import { useState } from 'react';

const App = () => {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState({});


  const onAdd = (product) => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCart(cart.filter((x) => x.id !== product.id));
    } else {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  const cartRemove = (product) => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist.qty) {
      setCart(cart.filter((x) => x.id !== product.id));
    } else {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, qty: 0 } : x
        )
      );
    }
  };
  const cartEmpty = () => setCart([]);

  const handleCaptureCheckout = (cartId, newOrder) => {
    try {
      const incomingOrder  = (cartId, newOrder);
      setOrder(incomingOrder);

      cartEmpty();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }


  return (
    <Router>
      <div>
        <CssBaseline />
        <Navbar countCartItems={cart.length}/>
        <Switch>
          <Route exact path="/">
            <Products onAdd={onAdd} products={products} />
          </Route>
          <Route path="/cart">
            <Cart cartEmpty={cartEmpty} cartRemove={cartRemove} onAdd={onAdd} cart={cart} onRemove={onRemove} />
          </Route>
          <Route path="/checkout">
            <Checkout cart={cart} order={order} error={errorMessage} onCaptureCheckout={handleCaptureCheckout} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
