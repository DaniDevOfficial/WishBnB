import React from 'react';
import { Box, Flex, Icon, Text, Button, Stack, useColorModeValue, HStack, UnorderedList, Heading, ListItem } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './RoomDetailsComponent.css';
import { getAllDataInRoute } from '../../repo/repo';
import { Room } from '../../types/Room';
import { useNavigate } from 'react-router-dom';

export function DescriptionAndRent({ room }: { room: Room }) {
    const navigate = useNavigate();
    const mapContainerStyle = {
        width: '100%',
        height: '300px',
    };

    const center = {
        lat: 47.459268,
        lng: 8.751775,
    };
    const fetchData = async () => {
        const data = await getAllDataInRoute("/rooms");
        console.log(data);
    }
    return (
        <Box mt={4}>
            <Flex align="center" mb={2}>
                <Icon as={FaUserCircle} boxSize={6} color="gray.500" mr={2} />
                <Text fontWeight="bold">{room.creator}</Text>
            </Flex>
            <Heading as="h2" size="lg" mb={2}>
                {room.title}
            </Heading>
            <Text color={useColorModeValue("text.base", "text.darkmode")} fontSize="md" mb={4}>
                {room.longDescription}
            </Text>
            <Flex align="center" mb={4}>
                <Text fontSize="lg" fontWeight="bold" color={useColorModeValue("accent.base", "accent.darkmode")}>
                    {room.price} CHF
                </Text>
                <Text color="gray.500" ml={2}>
                    Per Night
                </Text>
            </Flex>
            <Box mt={4}>
                <Heading as="h3" size="md">
                    Additional Features:
                </Heading>
                <UnorderedList>
                    {Object.keys(room.additionalFeatures).map((featureIndex) => {
                        const feature = room.additionalFeatures[featureIndex]

                        return (
                            <ListItem key={featureIndex}>
                                {feature.name}: {feature.pricePerNight} CHF per night
                            </ListItem>
                        );
                    })}
                </UnorderedList>
            </Box>
            <Heading my={4}>
                You Would Stay Here:
            </Heading>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_API_KEY}>
                <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={14}>
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
            <Box mt={4}>
                <Heading as="h3" size="md">
                    Available Dates:
                </Heading>
                <Calendar
                    tileDisabled={({ date }) =>
                        room.unavailableDates &&
                        room.unavailableDates.length > 0 &&
                        room.unavailableDates.some(
                            (dateRange) =>
                                new Date(date) >= new Date(dateRange.startDate) &&
                                new Date(date) <= new Date(dateRange.endDate)
                        )
                    }
                />
            </Box>


            <Button my={10} bgColor={useColorModeValue("primary.base", "primary.darkmode")} color={useColorModeValue("white", "black")} size="md" mb={4} onClick={(() => navigate(`/room/checkout/${room.id}`))}>
                Book Now
            </Button>

            <Text fontSize="lg" fontWeight="bold" mb={2}>
                Other Locations
            </Text>
            <Stack spacing={2}>
                <Text>Location 1</Text>
                <Text>Location 2</Text>
                <Text>Location 3</Text>
            </Stack>

        </Box>
    );
}
