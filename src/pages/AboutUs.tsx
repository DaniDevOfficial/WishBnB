import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

export function AboutUs() {
    return (
        <Box p={4} textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
                Welcome to WishBnB!
            </Heading>
            <Text fontSize="lg" mb={4}>
                Hey there, fellow dreamers and wanderers! 🌍✨ We are the quirky team behind WishBnB,
                your go-to destination for unforgettable stays in the whimsical world of Wish.
            </Text>
            <Text fontSize="lg" mb={4}>
                At WishBnB, we believe that every trip should be an adventure, and every stay should
                feel like stepping into a storybook. Whether you're seeking a cozy cottage, an enchanted
                treehouse, or a magical castle, we've got you covered.
            </Text>
            <Text fontSize="lg" mb={4}>
                Our mission is to make your travel dreams come true by offering unique and delightful
                accommodations that go beyond the ordinary. Each listing on WishBnB is carefully curated
                to ensure it adds that extra sprinkle of magic to your journey.
            </Text>
            <Text fontSize="lg">
                Join us on this whimsical ride, where ordinary stays become extraordinary memories.
                WishBnB - where wishes and wanderlust collide!
            </Text>
        </Box>
    );
}
