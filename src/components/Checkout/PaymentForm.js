import React from 'react'
import Review from './Review';

const PaymentForm = ({ nextStep, backStep, cartps, onCaptureCheckout, shippingData }) => {
    // console.log(cart);
  return (
    <>
      <Review shippingData={shippingData} nextStep={nextStep} cartps={cartps} backStep={backStep} onCaptureCheckout={onCaptureCheckout} />
    </>
  )
}

export default PaymentForm