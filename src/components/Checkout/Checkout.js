import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';

const steps = ['Shipping address', 'Payment details'];


const Checkout = ({ cart, cartp, order, error, onCaptureCheckout }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const history = useHistory();
  
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
  prod['line_items'] = [...cart];
  const cartps = prod;
  cartps['id'] = 'KLIN_3'+generate_token(9);

  console.log(cartps);
  console.log(cart);
  console.log(order)

  const next = (data) => {
    setShippingData(data);
    nextStep();
  }

  let Confirmation = () => (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  );


  const classes = useStyles();
  
  const Form = () => (activeStep === 0
    ? <AddressForm cartps={cartps} nextStep={nextStep} setShippingData={setShippingData} next={next} />
    : <PaymentForm cartps={cartps} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} shippingData={shippingData} backStep={backStep} />);

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
              <Step key={label}>
                <StepLabel style={{ paddingTop: '1rem' }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> :  <Form />}
        </Paper>
        <hr/>
        <div>
          <a style={{color: 'black', textDecoration: 'none'}} href="https://samuel-paschalson.netlify.app/">
            <span>Made by Samuelpaschalson</span>
          </a>
        </div>
      </main>
    </>
  )
}

export default Checkout