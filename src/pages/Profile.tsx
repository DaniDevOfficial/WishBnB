import  { useEffect, useState } from 'react'

import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { getDataInRouteByUserID } from '../repo/repo'
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

export function Profile() {

    const [rentals, setRentals] = useState<[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDataInRouteByUserID("/roomRentals", auth.currentUser?.uid ?? "");
                setRentals(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();

    return (
        <>

            <Heading>Welcome Back, {auth.currentUser?.displayName ?? auth.currentUser?.email ?? undefined}</Heading>
            <Text fontSize="2xl" mb={4}>
                Here are your current Rentals:
            </Text>
            {rentals.map((rentals, index) => (
                <Box
                    width="100%"
                    h={20}
                    borderRadius={4}
                    bg={useColorModeValue('backdrop.base', 'backdrop.darkmode')}
                    border="10px black 1px"
                    my={4}
                    transition="transform 0.2s"
                    _hover={{ transform: 'scale(1.01)' }}
                    onClick={() => navigate(`/room/${rentals.roomID}`)}
                    cursor={"pointer"}
                >
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        height="100%"
                        px={4}
                        py={2}
                    >
                        <Flex alignItems="center">
                            <Text fontSize="2xl" fontWeight="bold">
                                {rentals.totalPrice}
                            </Text>
                        </Flex>

                    </Flex>
                </Box>
            ))
            }


        </>
    )
}