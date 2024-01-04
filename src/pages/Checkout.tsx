import React, { useEffect, useState } from 'react'
import { Room } from '../types/Room'
import { Heading, Checkbox, Box, Text, useToast } from '@chakra-ui/react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export function Checkout({ rooms }: { rooms: Room[] }) {
    const route = window.location.pathname.split('/')
    const idToPayFor = route[3]
    const roomToPayFor = rooms.find((room) => room.id === idToPayFor)
    if (!roomToPayFor) return <Heading>Room not found</Heading>
    const toast = useToast();
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [totalPrice, setTotalPrice] = useState(roomToPayFor.price);

    useEffect(() => {
        // Calculate the total price based on selected features
        const additionalFeaturesTotal = selectedFeatures.reduce(
            (total, featureIndex) => total + Number(roomToPayFor.additionalFeatures[featureIndex].pricePerNight),
            0
        );
        setTotalPrice(Number(roomToPayFor.price) + additionalFeaturesTotal);
    }, [selectedFeatures, roomToPayFor]);

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
        let checkIfError = false;
        const startDate = Array.isArray(date) ? date[0] : date;
        const endDate = Array.isArray(date) ? date[date.length - 1] : date;
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
            return;
        }

        const datesBetween = getDates(startDate, endDate);
        console.log('Dates between:', datesBetween);
        datesBetween.forEach(dateBetween => {
            const formattedDate = dateBetween.toDateString();
            console.log('Selected Date:', formattedDate);

            const overlapUnavailable = roomToPayFor.unavailableDates.some(dateRange =>
                dateBetween >= new Date(dateRange.startDate) && dateBetween <= new Date(dateRange.endDate)
            );

            if (overlapUnavailable && !checkIfError) {
                checkIfError = true;
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
                />
            </Box>

            <Box mt={4}>
                <Heading as="h3" size="md">
                    Picked Dates:
                </Heading>
                <Text>
                    {selectedDates.map((date, index) => (
                        <span key={index}>{date.toDateString()}, </span>
                    ))}
                </Text>
            </Box>

            <Heading as="h4" mt={10}>Total Price Per Night: {totalPrice} CHF</Heading>
        </>
    )
}
function getDates(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

// Example usage:

