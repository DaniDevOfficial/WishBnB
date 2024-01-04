import React, { useState, useEffect } from 'react';

import { ref, set, push } from 'firebase/database';
import {
    ref as StorageRef,
    uploadBytes,
    getDownloadURL,

} from 'firebase/storage'
import { database, storage } from '../config/firebase';
import { auth } from '../config/firebase';
import { Flex, SkeletonText, Text, chakra, Heading, VStack, Form, Input, Button, FormControl, FormLabel, Textarea, HStack, IconButton, useColorModeValue, } from '@chakra-ui/react';
import { Room } from '../types/Room';
import { FaTrash } from 'react-icons/fa'; // Import trash icon for deleting features
import { useNavigate } from 'react-router-dom';


export function CreateNewRoom({ edit, rooms }: { edit: boolean, rooms: Room[] }) {
    const navigate = useNavigate();

    let selectedRoom = null;
    let welcomeText = "Create A New Room"
    if (edit) {
        const route = window.location.pathname.split('/')
        const idToEdit = route[3]
        console.log(rooms)
        selectedRoom = rooms.find((room) => room.id === idToEdit)
        if (selectedRoom.creatorID !== auth.currentUser?.uid) {
            navigate("/Creator")
        }
        welcomeText = "Edit Room"
    }
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
    const imagesarray = [];
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState([]);
    const [longDescription, setLongDescription] = useState('');
    const [additionalFeatures, setAdditionalFeatures] = useState(additionalFeaturesTmp);
    const [imagesFile, setImagesFile] = useState<File[]>([]);

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
        if (!edit) {
            await uploadImages(imagesFile)

        }

        if (!title || !description || !price || !location || !imagesarray || !longDescription) {
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
                set(roomRef, {
                    id: selectedRoom?.id || roomRef.key,
                    title,
                    description,
                    price,
                    location,
                    images: images,
                    longDescription,
                    additionalFeatures,
                    creator: auth.currentUser?.displayName,
                    unavailableDates: [],
                    creatorID,
                })
                console.log("update")
            } else {
                roomRef = push(ref(database, 'rooms'));
                set(roomRef, {
                    id: roomRef.key,
                    title,
                    description,
                    price,
                    location,
                    images: imagesarray,
                    longDescription,
                    additionalFeatures,
                    creator: auth.currentUser?.displayName,
                    unavailableDates: [],
                    creatorID,
                })
            }



            console.log('Saved');
            navigate(`/room/${roomRef.key}`)
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
        imagesarray.splice(0, imagesarray.length)
        setImagesFile([]);
    }

    const handleAddFeature = () => {
        setAdditionalFeatures([...additionalFeatures, { name: '', featurePrice: null }]);
    };

    const handleRemoveFeature = (index: number) => {
        const updatedFeatures = [...additionalFeatures];
        updatedFeatures.splice(index, 1);
        setAdditionalFeatures(updatedFeatures);
    };


    const handleRemoveImage = (index: number) => {
        const updatedImages = [...imagesFile];
        updatedImages.splice(index, 1);
        setImagesFile(updatedImages);
    };

    function addImage(e: any) {
        const file = e.target.files[0];
        if (file) {
            setImagesFile((prevImages) => [...prevImages, file]);
        }
    }

    async function uploadImages(files) {
        try {
            const uploadedImageUrls = await Promise.all(
                files.map(async (file) => {
                    const fileRef = StorageRef(storage, `images/Uploaded/${file.name}`);
                    try {
                        await uploadBytes(fileRef, file);
                        const url = await getDownloadURL(fileRef);
                        imagesarray.push(url);

                    } catch (uploadError) {
                        console.error('Error uploading file:', uploadError);
                    }
                })
            );
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    }


    const handleclick = () => {
        console.log(images)
    }

    return (
        <Flex alignItems="center" w="100%" direction="column">
            <Heading mb="4" onClick={handleclick}>{welcomeText}</Heading>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    saveRoom();
                }}
                style={{ width: '100%' }}
            >
                <FormControl mb="4" >
                    <FormLabel>Title</FormLabel>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
                </FormControl>

                <FormControl mb="4" >
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                </FormControl>
                <FormControl mb="4" >
                    <FormLabel>Long Description</FormLabel>
                    <Textarea
                        value={longDescription}
                        onChange={(e) => setLongDescription(e.target.value)}
                        placeholder="Enter a long version of the previous description (in md format)"
                    />
                </FormControl>
                <FormControl mb="4" >
                    <FormLabel>Price Per Night</FormLabel>
                    <Input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                    />
                </FormControl>

                <FormControl mb="4" >
                    <FormLabel>Location</FormLabel>
                    <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location" />
                </FormControl>

                <FormControl mb="4" >
                    <FormLabel>Additional Features</FormLabel>
                    <VStack spacing="2">
                        {additionalFeatures.map((feature, index) => (
                            <HStack key={index} spacing="2">
                                <FormLabel>Feature: </FormLabel>
                                <Input
                                    placeholder="Feature Name"
                                    value={feature.name}
                                    isRequired
                                    onChange={(e) => {
                                        const updatedFeatures = [...additionalFeatures];
                                        updatedFeatures[index].name = e.target.value;
                                        setAdditionalFeatures(updatedFeatures);
                                    }}
                                />
                                <Input
                                    type="number"
                                    placeholder="Feature Price"
                                    isRequired
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
                {edit ? null : (
                    <FormControl mb="4" isRequired>
                        <FormLabel>Room Images</FormLabel>
                        <VStack spacing="2">
                            {imagesFile.map((image, index) => (
                                <HStack key={index} spacing="2">
                                    <Text>{index === 0 ? 'Cover Image' : `Image ${index + 1}:`} </Text>
                                    <SkeletonText isLoaded={true}>
                                        <chakra.img
                                            src={URL.createObjectURL(image)}
                                            alt={`Room ${index + 1}`}
                                            maxW="200px"
                                            maxH="200px"
                                        />
                                    </SkeletonText>
                                    <IconButton
                                        icon={<FaTrash />}
                                        aria-label="Delete Image"
                                        onClick={() => handleRemoveImage(index)}
                                    />
                                </HStack>
                            ))}
                        </VStack>
                        <Input type="file" accept="image/*" onChange={addImage} mt="2" />
                    </FormControl>
                )}
                <Button bgColor={useColorModeValue('accent.base', 'accent.darkmode')} type="submit">
                    Save Room
                </Button>
            </form>
        </Flex>
    );
}
