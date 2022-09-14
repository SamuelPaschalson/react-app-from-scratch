import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from './CustomTextField';
import { ReactNaijaStateLgaSelect } from 'react-select-nigeria-states-lga'
import 'react-select-nigeria-states-lga/dist/index.css'
import useStyles from './styles'


const AddressForm = ({ next, cartps }) => {
    const methods = useForm();
    const classes = useStyles();

    const [towns, setLga] = useState([]);
    const [naijaState, setNaijaState] = useState('');
    const [naijaLga, setNaijaLga] = useState('');
    const [selectedState, setSelectedState] = useState('')
    const [selectedLga, setSelectedLga] = useState('')
    console.log(cartps);
    return (
    <>
      <Typography className={classes.content} variant="h6" gutterBottom>Shipping address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({ ...data }))}>
            <Grid container spacing={3} className={classes.content} >
                <FormInput required name="firstName" label="First name" />
                <FormInput required name="lastName" label="Last name" />
                <FormInput required name="address1" label="Address line 1" />
                <FormInput required name="email" label="Email" />
                <FormInput required name="city" label="City" />
                <FormInput required name="state" label="State" />
                <FormInput required name="zip" label="Zip / Postal code" />
            </Grid>

          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '.5rem 3rem', }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm