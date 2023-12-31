import { Box, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FaBed } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';

import { Room } from '../types/Room';

export function SingleOffer({ room }: { room: Room }) {
    return (
        <>
            <Box
                width="100%"
                h={10}
                borderRadius={4}
                bg={useColorModeValue('backdrop.base', 'backdrop.darkmode')}
                border="10px black 1px"
                my={4}
            >
                <Flex alignItems="center" h="100%" mx={4}>
                    <Box bg={useColorModeValue('backdrop.icon', 'backdrop.darkmode')} p={2} borderRadius="md">
                        <Icon as={FaBed} />
                    </Box>
                    <Box mx={4}>{room.title}</Box>
                    <Flex ml="auto">
                        <Box bg={useColorModeValue('backdrop.icon', 'backdrop.darkmode')} p={2} borderRadius="md" mx={1}>
                            <Icon as={CiEdit} />
                        </Box>
                        <Box bg={useColorModeValue('backdrop.icon', 'backdrop.darkmode')} p={2} borderRadius="md" mx={1}>
                            <Icon as={MdDelete} />
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
