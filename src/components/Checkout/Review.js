import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { List, ListItem, ListItemText } from '@material-ui/core';;
import emailjs from 'emailjs-com';
// import { InterswitchPay } from 'react-interswitch'
const stripePromise = loadStripe('pk_test_51LQzFpESZZ3wRN2sV8hQiszHdBk6VYDpRVlQ5LMIM961M5h48HqLqNnOPSYGLjhswnpzbzez610Rg6nZCG6I1Syi002gVlY94J');

const Review = ({ nextStep, backStep, cartps, shippingData, onCaptureCheckout }) => {
  const itemsPrice = cartps.line_items.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.20;
  const shippingPrice = 10;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const SERVICE_ID = "service_icx2244";
  const TEMPLATE_ID = "template_jf6x19a";
  const USER_ID = "WiD0pus-Ytizm-4RT";
  
  console.log(cartps.line_items);
  console.log(shippingData);

  console.log(shippingData.email)
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log('[error]', error);
    } else {
      const orderData = {
        line_items: cartps.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, state: shippingData.state, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
        // fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(cartps.id, orderData);

      nextStep();
    }
  };

  return (
  <>
    <Typography style={{ padding: '0 3rem' }} variant="h6" gutterBottom>Order summary</Typography>
    <List disablePadding>
      {cartps.line_items.map((product) => (
              <ListItem style={{ padding: '10px 3rem' }} key={product.name}>
                <ListItemText primary={product.name} secondary={`Quantity: ${product.qty}`} />
                <Typography variant="body2">${product.price.toFixed(2)}</Typography>
              </ListItem>
              ))}
              <ListItem style={{ padding: '10px 3rem' }}>
                <ListItemText primary="Tax Price" />
                <Typography variant="subtitle1" style={{ fontWeight: 500 }}>
                ${taxPrice.toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem style={{ padding: '10px 3rem' }}>
                <ListItemText primary="Shipping Price" />
                <Typography variant="subtitle1" style={{ fontWeight: 500 }}>
                ${shippingPrice.toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem style={{ padding: '10px 3rem' }}>
                <ListItemText primary="Total Price" />
                <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                ${totalPrice.toFixed(2)}
                </Typography>
              </ListItem>
    </List>

      <Divider />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>{({ elements, stripe }) => (
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <CardElement />
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={backStep}>Back</Button>
              <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                Pay {totalPrice}
              </Button>
            </div>
          </form>
        )}
        </ElementsConsumer>
      </Elements>
      
  </>
)
};

export default Review;
