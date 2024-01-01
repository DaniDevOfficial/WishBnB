import { Box, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FaBed } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Room } from '../types/Room';

export function SingleOffer({ room }: { room: Room }) {
    const navigate = useNavigate();
    function handleClick() {
        navigate(`/room/${room.id}`);
    }
    return (
        <>
            <Box
                width="100%"
                h={20}
                borderRadius={4}
                bg={useColorModeValue('backdrop.base', 'backdrop.darkmode')}
                border="10px black 1px"
                my={4}
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
                        transition="transform 0.2s"
                        _hover={{ transform: 'scale(1.1)' }}
                        onClick={handleClick}
                    >
                        <Icon as={FaBed} />
                    </Box>
                    <Box mx={4}>{room.title}</Box>
                    <Flex ml="auto">
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bg={useColorModeValue('backdrop.200', 'backdrop.500')}
                            p={2}
                            borderRadius="md"
                            mx={1}
                            h={10}
                            w={10}
                            transition="transform 0.2s"
                            _hover={{ transform: 'scale(1.1)' }}
                        >
                            <Icon as={CiEdit} />
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bg={useColorModeValue('backdrop.200', 'backdrop.500')}
                            p={2}
                            borderRadius="md"
                            mx={1}
                            h={10}
                            w={10}
                            transition="transform 0.2s"
                            _hover={{ transform: 'scale(1.1)' }}
                        >
                            <Icon as={MdDelete} />
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
