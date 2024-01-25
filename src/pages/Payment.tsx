import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentForm } from '../components/PaymentForm';

const stripePromise = loadStripe('pk_test_51ObV9vABUAv3aJwenuDQv0omkTcos794yAy7FIAcjn8o1uQy8ztjgzK74EBwvM3A0ifYAWecjrtzTcxfnlSM8ZOW00fbKjmovZ');

export function Payment(){
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

