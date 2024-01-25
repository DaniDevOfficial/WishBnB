
import React, { useEffect, useState } from 'react'
import { Room } from '../types/Room'
import { Heading, Checkbox, Box, Text, useToast, Button } from '@chakra-ui/react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export function Checkout({ rooms }: { rooms: Room[] }) {
    const route = window.location.pathname.split('/')
    const idToPayFor = route[3]
    const roomToPayFor = rooms.find((room) => room.id === idToPayFor)
    if (!roomToPayFor) return <Heading>Room not found</Heading>
    const toast = useToast();
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [totalPrice, setTotalPrice] = useState(roomToPayFor.price);
    const [nightAmout, setNightAmount] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        // Calculate the total price based on selected features
        const additionalFeaturesTotal = selectedFeatures.reduce(
            (total, featureIndex) => total + Number(roomToPayFor.additionalFeatures[featureIndex].pricePerNight),
            0
        );
        setTotalPrice(Number(roomToPayFor.price) + additionalFeaturesTotal);
    }, [selectedFeatures, roomToPayFor]);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

    const handleCaptchaVerify = () => {
        if (isCaptchaVerified) setIsCaptchaVerified(false);
        else
        {
            setIsCaptchaVerified(true);
        }

    };
    const handleFeatureToggle = (featureIndex: string) => {
        // Toggle the selected features
        setSelectedFeatures((prevSelectedFeatures) => {
            if (prevSelectedFeatures.includes(featureIndex)) {
                return prevSelectedFeatures.filter((selectedFeature) => selectedFeature !== featureIndex);
            } else {
                return [...prevSelectedFeatures, featureIndex];
            }
        });
    };

    const handleDateChange = (date: Date | Date[]) => {
        let checkForMultipleToasts = false;
        let checkIfError = false;
        const startDate = Array.isArray(date) ? date[0] : date;
        const endDate = Array.isArray(date) ? date[date.length - 1] : date;
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);

        if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
            return;
        }

        const datesBetween = getDates(startDate, endDate);
        if (datesBetween.length <= 1) {
            toast({
                title: 'Invalid Date Range',
                description: 'Start and end dates cannot be the same.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });

            setSelectedDates([]);
            return;
        }
        setNightAmount(datesBetween.length - 1);
        if (roomToPayFor.unavailableDates) {
            console.log(' dates');
            datesBetween.forEach(dateBetween => {
                const formattedDate = dateBetween.toDateString();
                console.log('Selected Date:', formattedDate);

                const overlapUnavailable = roomToPayFor.unavailableDates.some(dateRange =>
                    dateBetween >= new Date(dateRange.startDate) && dateBetween <= new Date(dateRange.endDate)
                );

                if (overlapUnavailable && !checkForMultipleToasts) {
                    checkIfError = true;
                    checkForMultipleToasts = true;
                    toast({
                        title: 'Invalid Date Range',
                        description: 'Please select available dates.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });

                    // Reset selected dates
                    setSelectedDates([]);
                    return;
                }
            });
        } else {
            setSelectedDates(Array.isArray(date) ? date : [date]);
        }
        // Set selected dates only if there are no overlapping dates or same start and end dates
        if (!checkIfError) {
            setSelectedDates(Array.isArray(date) ? date : [date]);
        }
    };



    const tileDisabled = ({ date, view }: { date: Date, view: string }) => {
        return (
            view === 'month' &&
            roomToPayFor.unavailableDates &&
            roomToPayFor.unavailableDates.length > 0 &&
            roomToPayFor.unavailableDates.some(
                (dateRange) =>
                    date >= new Date(dateRange.startDate) &&
                    date <= new Date(dateRange.endDate)
            )
        );
    };

    const handlePayWithStripe = () => {
        if (isCaptchaVerified) {
            navigate(`/room/payment/${idToPayFor}`, { state: { roomToPayFor, selectedDates, selectedFeatures, totalPrice } });
        } else {
            toast({
                title: 'CAPTCHA Verification Failed',
                description: 'Please verify that you are not a robot.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Heading>Checkout</Heading>
            <Heading as="h2" mb={10}>Room to Pay for: {roomToPayFor?.title}</Heading>
            <Heading as="h4">Additional Features:</Heading>

            {Object.keys(roomToPayFor.additionalFeatures).map((featureIndex) => {
                const feature = roomToPayFor.additionalFeatures[featureIndex];

                return (
                    <>
                        <Checkbox
                            isChecked={selectedFeatures.includes(featureIndex)}
                            onChange={() => handleFeatureToggle(featureIndex)}
                        >
                            {feature.name}: {feature.pricePerNight} CHF per night
                        </Checkbox>
                        <br />
                    </>
                );
            })}

            <Box mt={4}>
                <Heading as="h3" size="md">
                    Select Stay Dates:
                </Heading>
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDates}
                    selectRange={true}
                    tileDisabled={tileDisabled}
                    minDate={new Date()}
                />
            </Box>

            <Box mt={4}>
                <Heading as="h3" size="md">
                    Picked Dates:
                </Heading>
                {selectedDates && (
                    <Text>
                        This is {nightAmout} nights
                    </Text>
                )}
            </Box>

            <Heading as="h4" mt={10}>Total Price: {totalPrice * nightAmout} CHF</Heading>
            <Box mt={10}>
                <ReCAPTCHA
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} // Replace with your actual reCAPTCHA site key
                    onChange={handleCaptchaVerify}
                />
            </Box>
            <Button
                mt={10}
                size="lg"
                isDisabled={selectedDates.length === 0 || !isCaptchaVerified}
                onClick={handlePayWithStripe}
            >
                Pay with Stripe Now
            </Button>
        </>
    )
}
function getDates(startDate: String, endDate: String) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}


