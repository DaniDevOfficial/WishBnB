import { useState, useEffect } from 'react';
import { Box, Image, Heading, Text, Skeleton, useColorMode, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SingleLocationContainer({ post }: { post: any }) {
    const { title, image, description, price, location, id } = post;
    const [isLoading, setIsLoading] = useState(true);
    const { colorMode } = useColorMode();
    const navigete = useNavigate();
    useEffect(() => {
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(delay);
    }, []);
    

    return (
        <Box boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" borderRadius="md" width={"1xl"} p={4} >
            {isLoading ? (
                <>
                    <Skeleton height="160px" width="270px" borderRadius="md" mb="2" />
                    <Skeleton height="0.6rem" width="40%" borderRadius="md" mb="2" />
                    <Skeleton height="1.5rem" width="80%" borderRadius="md" mb="2" />
                    <Skeleton height="1rem" width="90%" borderRadius="md" mb="2" />
                    <Skeleton height="1rem" width="90%" borderRadius="md" mb="2" />
                    <Skeleton height="1rem" width="90%" borderRadius="md" mb="2" />
                    <Skeleton height="1.5rem" width="50%" borderRadius="md" mb="2" />
                </>
            ) : (
                <Image
                    src={image}
                    alt={title}
                    h="160px"
                    w="270px"
                    objectFit="cover"
                    borderRadius="md"
                    mb="2"
                    fallback={
                        <Skeleton
                            h="160px"
                            w="270px"
                            borderRadius="md"
                            mb="2"
                        />}
                />
            )}
            <Text fontSize={"xs"} color={colorMode === 'dark' ? "smalltext.base" : "smalltext.base"} mb="1" display={isLoading ? "none" : "block"} >
                {`Location: ${location}`}
            </Text>
            <Heading as="h3" size="md" mb="1" color={colorMode === 'dark' ? "text.darkmode" : "black"} display={isLoading ? "none" : "block"}>
                {title}
            </Heading>
            <Text fontSize="sm" color={colorMode === 'dark' ? "text.darkmode" : "text.base"} mb="2" maxW="270px" display={isLoading ? "none" : "block"}>
                {description}
            </Text>
            <Text fontWeight="bold" fontSize="lg" color={colorMode === 'dark' ? "secondary.darkmode" : "secondary.base"} display={isLoading ? "none" : "block"}>
                {`Price Per Night: ${price}.00 CHF`}
            </Text>
            <Button
                mt={4}
                color={colorMode === 'dark' ? 'primary.darkmode' : 'primary.base'}
                size="sm"
                display={isLoading ? "none" : "block"}
                onClick={() => {navigete(`room/${id}`)}}
            >
                Book Now
            </Button>
        </Box>
    );
}
