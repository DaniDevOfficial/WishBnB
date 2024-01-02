import React, { useState, useEffect, useRef } from 'react';

import { ref, set, push } from 'firebase/database';
import { database } from '../config/firebase';
import { auth } from '../config/firebase';
import { Flex, SkeletonText, Text, chakra, Heading, VStack, Form, Input, Button, FormControl, FormLabel, Textarea, HStack, IconButton, useColorModeValue, } from '@chakra-ui/react';
import { Room } from '../types/Room';
import { FaTrash } from 'react-icons/fa'; // Import trash icon for deleting features


export function CreateNewRoom({ selectedRoom }: { selectedRoom: Room | null }) {
    const additionalFeaturesTmp = [
        {
            "name": "Scuba Diving Experience",
            "pricePerNight": 10
        },
        {
            "name": "Private Chef",
            "pricePerNight": 20
        }
    ]
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState([]);
    const [longDescription, setLongDescription] = useState('');
    const [additionalFeatures, setAdditionalFeatures] = useState(additionalFeaturesTmp);

    useEffect(() => {
        if (selectedRoom) {
            setDescription(selectedRoom.description);
            setTitle(selectedRoom.title);
            setPrice(selectedRoom.price);
            setLocation(selectedRoom.location);
            setImages(selectedRoom.images);
            setLongDescription(selectedRoom.longDescription);
            setAdditionalFeatures(selectedRoom.additionalFeatures);
        } else {
            setDescription('');
            setTitle('');
            setPrice('');
            setLocation('');
            setImages([]);
            setLongDescription('');
            setAdditionalFeatures(additionalFeaturesTmp);
        }
    }, [selectedRoom]);

    async function saveRoom() {
        if (!title || !description || !price || !location || !images || !longDescription) {
            console.error('Missing Fields');
            return;
        }

        try {
            const creatorID = auth.currentUser?.uid;
            if (!creatorID) {
                console.error('Missing Creator ID');
                return;
            }
            let roomRef;

            if (selectedRoom) {
                roomRef = ref(database, `rooms/${selectedRoom.id}`);
            } else {
                roomRef = push(ref(database, 'rooms'));
            }

            set(roomRef, {
                id: selectedRoom?.id || roomRef.key,
                title,
                description,
                price,
                location,
                images,
                longDescription,
                additionalFeatures,
                creatorID,
                creator: auth.currentUser?.displayName,
            });

            console.log('Saved');
            onCreate();
        } catch (error) {
            console.error('Error Saving:', error);
        }
    }



    function onCreate() {
        setTitle('');
        setDescription('');
        setPrice('');
        setLocation('');
        setImages([]);
        setLongDescription('');
        setAdditionalFeatures([]);


    }

    const handleAddFeature = () => {
        setAdditionalFeatures([...additionalFeatures, { name: '', featurePrice: null }]);
    };

    const handleRemoveFeature = (index: number) => {
        const updatedFeatures = [...additionalFeatures];
        updatedFeatures.splice(index, 1);
        setAdditionalFeatures(updatedFeatures);
    };









    return (
        <Flex alignItems="center" w="100%" direction="column">
            <Heading mb="4">Create A New Room</Heading>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    saveRoom();
                }}
                style={{ width: '100%' }}
            >
                <FormControl mb="4" isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
                </FormControl>

                <FormControl mb="4" isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                </FormControl>

                <FormControl mb="4" isRequired>
                    <FormLabel>Price Per Night</FormLabel>
                    <Input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                    />
                </FormControl>

                <FormControl mb="4" isRequired>
                    <FormLabel>Location</FormLabel>
                    <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location" />
                </FormControl>

                <FormControl mb="4">
                    <FormLabel>Additional Features</FormLabel>
                    <VStack spacing="2">
                        {additionalFeatures.map((feature, index) => (
                            <HStack key={index} spacing="2">
                                <FormLabel>Feature: </FormLabel>
                                <Input
                                    placeholder="Feature Name"
                                    value={feature.name}
                                    onChange={(e) => {
                                        const updatedFeatures = [...additionalFeatures];
                                        updatedFeatures[index].name = e.target.value;
                                        setAdditionalFeatures(updatedFeatures);
                                    }}
                                />
                                <Input
                                    type="number"
                                    placeholder="Feature Price"
                                    value={feature.pricePerNight}
                                    onChange={(e) => {
                                        const updatedFeatures = [...additionalFeatures];
                                        updatedFeatures[index].pricePerNight = Number(e.target.value);
                                        setAdditionalFeatures(updatedFeatures);
                                    }}
                                />
                                <IconButton
                                    icon={<FaTrash />}
                                    aria-label="Delete Feature"
                                    onClick={() => handleRemoveFeature(index)}
                                />
                            </HStack>
                        ))}
                    </VStack>
                    <Button mt="2"
                        bgColor={useColorModeValue('primary.base', 'primary.darkmode')}
                        onClick={handleAddFeature}>
                        Add Feature
                    </Button>
                </FormControl>

                <Button bgColor={useColorModeValue('accent.base', 'accent.darkmode')} type="submit">
                    Save Room
                </Button>
            </form>
        </Flex>
    );
}
