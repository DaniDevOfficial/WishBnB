import React from 'react';
import { Box, Image, Heading, Text } from '@chakra-ui/react';

export function SingleLocationContainer({ post }: { post: any }) {
    const { title, image, description, price } = post;

    return (
        <Box boxShadow="md"  borderRadius="md" width={"1xl"}>
            <Image src={image} alt={title} maxH="200px" maxW="300px" objectFit="cover" borderRadius="md" mb="2" />
            <Heading as="h3" size="md" mb="2">
                {title}
            </Heading>
            <Text fontSize="sm" color="gray.500" mb="2">
                {description}
            </Text>
            <Text fontWeight="bold" fontSize="lg">
                Price: ${price}
            </Text>
        </Box>
    );
}
