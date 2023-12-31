import React from 'react'
import { Room } from '../../types/Room'
import { SingleOffer } from '../SingleOffer'
import { Box } from '@chakra-ui/react'

export function YourOffers({ rooms }: { rooms: Room[] }) {

    return (
        <>


                Her are all your Current Offers
                {rooms.map((room, index) => (
                    <SingleOffer key={index} room={room} />
                ))
                }
        </>
    )
}