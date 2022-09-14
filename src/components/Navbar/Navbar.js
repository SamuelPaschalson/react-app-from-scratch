import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart, Store } from '@material-ui/icons';
import { logos } from '../Products/Product/ProductData';
import { Link, useLocation } from 'react-router-dom';

import useStyles from './styles';

const Navbar = (props) => {
    const location = useLocation();
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          {logos.map((logo) => (
          <Typography component={Link} to="/" key={logo.id} variant="h6" className={classes.title} color="inherit">
            <Store height="25px" className={classes.image} /> E-commerce
          </Typography>
        ))}
          <div className={classes.grow} />
          {location.pathname === '/' && (
          <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
            {''}{props.countCartItems ? (

              <Badge badgeContent={props.countCartItems} color="secondary">
                <ShoppingCart />
              </Badge>          ) : (
            ''
          )}{''}
            </IconButton>
          </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

//     <header className="block row center">
//       <div>
//         <a href="#/">
//           <h1>Small Shopping Cart</h1>
//         </a>
//       </div>
//       <div>
//         <a href="#/cart">
//           Cart{' '}
//           {props.countCartItems ? (
//             <button className="badge">{props.countCartItems}</button>
//           ) : (
//             ''
//           )}
//         </a>{' '}
//         <a href="#/signin"> SignIn</a>
//       </div>
//     </header>
//   );
// }
