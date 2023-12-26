import React from 'react';
import { Box, Flex, Icon, Text, Button, Stack } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export function DescriptionAndRent({ content }) {
    const mapContainerStyle = {
        width: '100%',
        height: '300px',
    };

    const center = {
        lat: 47.459268,
        lng: 8.751775,
    };

    return (
        <Box mt={4}>
            <Flex align="center" mb={2}>
                <Icon as={FaUserCircle} boxSize={6} color="gray.500" mr={2} />
                <Text fontWeight="bold">{content.creator}</Text>
            </Flex>
            <Text color="gray.700" fontSize="md" mb={4}>
                {content.longDescription}
            </Text>
            <Flex align="center" mb={4}>
                <Text fontSize="lg" fontWeight="bold" color="teal.500">
                    {content.price} CHF
                </Text>
                <Text color="gray.500" ml={2}>
                    Per Night
                </Text>
            </Flex>
            <Button colorScheme="teal" size="md" mb={4}>
                Book Now
            </Button>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
                Other Locations
            </Text>
            <Stack spacing={2}>
                {/* Example other locations, replace with your actual data */}
                <Text>Location 1</Text>
                <Text>Location 2</Text>
                <Text>Location 3</Text>
            </Stack>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_API_KEY}>
                <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={14}>
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        </Box>
    );
}
