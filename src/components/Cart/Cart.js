import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import CartItems from './CartItems/CartItems';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const Cart = ({ cart, onAdd, onRemove, cartRemove, cartEmpty }) => {
    const classes = useStyles();
    // console.log(cart);
    const itemsPrice = cart.reduce((a, c) => a + c.qty * c.price, 0);
    const totalPrice = itemsPrice;

      function generate_token(length){
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        var b = [];  
        for (var i=0; i<length; i++) {
            var j = (Math.random() * (a.length-1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
      }
      const prod = {...cart};
      prod['line_items'] = {...cart};
      const cartp = prod;
      cartp['id'] = 'KLIN_3'+generate_token(9);

    console.log(cartp);
    return (
        <Container>
          <div className={classes.toolbar} />
          <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
          {cart.length === 0 && 
          <Typography variant="subtitle1">You have no items in your shopping cart,
            <Link className={classes.link} to="/">start adding some</Link>!
          </Typography>}
          <>
            <Grid container spacing={3}>
              {cart.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                  <CartItems cartRemove={cartRemove} onAdd={onAdd} onRemove={onRemove} item={item} />
                </Grid>
              ))}

            </Grid>
            {cart.length !== 0 && (
              <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: ${totalPrice.toFixed(2)}</Typography>
                <div>
                  <Button className={classes.emptyButton} size="large" type="button" variant="contained" onClick={() => cartEmpty(cart)} color="secondary">Empty cart</Button>
                  <Button cart={cart} cartp={cartp} className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
              <a style={{color: 'black', textDecoration: 'none', alignItems: 'center'}} href="https://samuel-paschalson.netlify.app/">
                <span style={{color: 'black', textDecoration: 'none', alignItems: 'center'}}>Made by Samuelpaschalson</span>
              </a>
            </div>
            )}
          </>
        </Container>
      );
}

export default Cart