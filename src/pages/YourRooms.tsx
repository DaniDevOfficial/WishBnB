import React from 'react'
import { Room } from '../types/Room'
import { YourOffers } from '../components/Creator/YourOffers'
import { getAuth } from 'firebase/auth';
import { Container } from '@chakra-ui/react';

export function YourRooms({ rooms }: { rooms: Room[] }) {
    const auth = getAuth();
    const RoomsOfCreator =  rooms.filter(room => room.creatorID === auth.currentUser?.uid);
    return (
        <>
            <YourOffers rooms={RoomsOfCreator}/>
        </>
    )
}