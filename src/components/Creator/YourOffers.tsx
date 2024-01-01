import React from 'react'
import { Room } from '../../types/Room'
import { SingleOffer } from '../SingleOffer'
import { Box, Heading, Text } from '@chakra-ui/react'
import { auth } from '../../config/firebase'

export function YourOffers({ rooms }: { rooms: Room[] }) {

    return (
        <>

            <Heading>Welcome Back, {auth.currentUser?.displayName ?? auth.currentUser?.email ?? undefined}</Heading>
            <Text fontSize="2xl" color="text.base" mb={4}>
                Here are your offers:
            </Text>
            {rooms.map((room, index) => (
                <SingleOffer key={index} room={room} />
            ))
            }
        </>
    )
}