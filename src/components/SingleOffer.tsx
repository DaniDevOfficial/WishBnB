import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Box, Flex, Icon, useColorModeValue, useDisclosure, Button
    , useToast
} from '@chakra-ui/react';
import React from 'react';
import { FaBed } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Room } from '../types/Room';
import { database } from '../config/firebase';
import { ref, set } from 'firebase/database';

export function SingleOffer({ room }: { room: Room }) {
    const toast = useToast()
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    function handleClick() {
        navigate(`/room/${room.id}`);
    }
    function handleEdit() {
        navigate(`/Creator/Upload/${room.id}`);
    }
    async function handleDelete() {
        const roomRef = ref(database, `rooms/${room.id}`);
        await set(roomRef, null);
        toast({
            title: 'Room deleted',
            description: `Your room with the id ${room.id} has been deleted.`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        

        onClose()
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
                        cursor={"pointer"}

                    >
                        <Icon as={FaBed} />
                    </Box>
                    <Box mx={4}>{room.title}</Box>
                    <Flex ml="auto">
                        <Button
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
                            cursor={"pointer"}
                        >
                            <Icon as={CiEdit} />
                        </Button>
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
                            cursor={"pointer"}
                            onClick={onOpen}

                        >
                            <Icon as={MdDelete} />
                        </Box>
                    </Flex>
                </Flex>
            </Box>
            <>


                <AlertDialog
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Delete Room with ID {room.id}
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure? You can't undo this action afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red' onClick={handleDelete} ml={3}>
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
        </>
    );
}
