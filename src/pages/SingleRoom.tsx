import { Box, Container } from "@chakra-ui/react";
import { ImageDisplay } from "../components/SingleRoom/ImageDisplay";
import { DescriptionAndRent } from "../components/SingleRoom/DescriptionAndRent";
import { Room } from "../types/Room";

export function SingleRoom({ rooms }: { rooms: Room[] }) {
    const id = window.location.pathname.split('/').pop();
    console.log(id);
    const room = rooms.find(room => room.id === id);
    if (!room) {
        return (
            <Box>
                <h1>Room not found</h1>
            </Box>
        )
    }

    return (
        <>
                <ImageDisplay slides={room.images} />
                <DescriptionAndRent room={room} />
        </>
    )
}