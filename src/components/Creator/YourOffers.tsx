import React from 'react'
import { Room } from '../../types/Room'
import { SingleOffer } from '../SingleOffer'
import { Box, Flex, Heading, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { auth } from '../../config/firebase'
import { CiSquarePlus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'

export function YourOffers({ rooms }: { rooms: Room[] }) {
    const navigate = useNavigate();
    function handleClick() {
        navigate("/Creator/Upload/NewRoom");
    }
    return (
        <>

            <Heading>Welcome Back, {auth.currentUser?.displayName ?? auth.currentUser?.email ?? undefined}</Heading>
            <Text fontSize="2xl" mb={4}>
                Here are your offers:
            </Text>
            {rooms.map((room, index) => (
                <SingleOffer key={index} room={room} />
            ))
            }

            <Box
                width="100%"
                h={20}
                borderRadius={4}
                bg={useColorModeValue('backdrop.base', 'backdrop.darkmode')}
                border="10px black 1px"
                my={4}
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.01)' }}
                onClick={handleClick}
                cursor={"pointer"}
            >
                <Flex alignItems="center" h="100%" mx={4}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg={useColorModeValue('backdrop.200', 'backdrop.500')}
                        p={2}
                        h={10}
                        w={10}
                        borderRadius="md"

                    >
                        <Icon as={CiSquarePlus} />
                    </Box>
                    <Box mx={4}>Create A New Offer</Box>
                </Flex>
            </Box>
        </>
    )
}