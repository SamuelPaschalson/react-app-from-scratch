import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';

const CartItems = ({ item, onAdd, onRemove, cartRemove }) => {
    const classes = useStyles();


    return (
    <Card className="cart-item">
      <CardMedia image={item.image} alt={item.name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">${item.price.toFixed(2)}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
        <Button type="button" size="small" onClick={() =>  onRemove(item)}>-</Button>
          <Typography>&nbsp;{item.qty}&nbsp;</Typography>
          <Button type="button" size="small" onClick={() =>  onAdd(item)}>+</Button>
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={() => cartRemove(item)}>Remove</Button>
      </CardActions>
    </Card>
  )
}

export default CartItems