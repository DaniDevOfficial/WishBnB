import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useToast, Box, Heading, Button, FormControl, FormLabel, FormErrorMessage, Text } from '@chakra-ui/react';

export function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const { state } = location;
    console.log(state);
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (!state) {
            toast({
                title: 'No Payment Information',
                description: 'Please Select something to then actually pay for.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            navigate('/');
        }
    }, [state, navigate, toast]);

    if (!state) {
        return <div>No payment information available.</div>;
    }

    const { roomToPayFor, selectedDates, selectedFeatures, totalPrice } = state;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { token, error } = await stripe.createToken(elements.getElement(CardElement));

        if (error) {
            console.error(error);
            setPaymentError(error.message);
        } else {
            setPaymentSuccess(true);
        }
    };

    return (
        <Box maxW="600px" mx="auto" textAlign="center" p="4">
            <Heading as="h2" mb="4">
                Payment Information for: {roomToPayFor.title}    
            </Heading>
            <Text mb="4">
                Total Price: {totalPrice} CHF
            </Text>
            <Text mb="4">
                Selected Dates: {selectedDates[0].toLocaleDateString()} - {selectedDates[1].toLocaleDateString()}
            </Text>
            {selectedFeatures.length > 0 && (
                <Text mb="4">
                    Selected Features: {selectedFeatures.map((feature) => roomToPayFor.additionalFeatures[feature].name).join(', ')}
                </Text>
            )}
            <form onSubmit={handleSubmit}>
                <FormControl mb="4">
                    <FormLabel>Card Details</FormLabel>
                    <CardElement />
                    <FormErrorMessage>{paymentError}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="blue" size="lg" disabled={!stripe}>
                    Pay
                </Button>
            </form>
            {paymentSuccess && (
                <Text mt="4" color="green.500">
                    Payment successful!
                </Text>
            )}
        </Box>
    );
}
