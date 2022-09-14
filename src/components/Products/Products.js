import React from 'react'
import Grid from '@material-ui/core/Grid';
import Product from './Product/Product';
import useStyles from './styles'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Products = ({products, onAdd}) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar}/>
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAdd={onAdd} />
          </Grid>
        ))}
              <hr/>
        <div>
          <a style={{color: 'black', textDecoration: 'none'}} href="https://samuel-paschalson.netlify.app/">
            <span>Made by Samuelpaschalson</span>
          </a>
        </div>
      </Grid>
    </main>

  )
}

export default Products