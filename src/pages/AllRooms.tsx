import React from 'react'
import { Room } from '../types/Room'
import { SingleLocationContainer } from '../components/SingleLocationContainer'
import { Flex, WrapItem } from '@chakra-ui/react'

export function AllRooms({ rooms }: { rooms: Room[] }) {

    return (
        <>
            <h1>All rooms</h1>

            <Flex
            flexWrap={"wrap"}
            gap={4}            
            justifyContent="center"
            my={10}
        >
            {rooms.map(room => (
                <WrapItem >
                    <SingleLocationContainer post={room} />
                </WrapItem>
            ))}
        </Flex>
        </>
    
    )
}