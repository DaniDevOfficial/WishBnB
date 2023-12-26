import { Box, Container } from "@chakra-ui/react";
import { ImageDisplay } from "../components/SingleRoom/ImageDisplay";

export function SingleRoom() {
    const id = window.location.pathname.split('/').pop();
    console.log(id);
    // RoomDetails structure
    const roomDetails = {
        id: "3",
        title: "The Underwater Treehouse",
        location: "Aqua Arboretum, location3",
        description: "Dive into the world's first underwater treehouse...",
        longDescription: "Experience the enchantment of staying in an underwater treehouse...",
        price: "30",
        images: ["https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80"],
        comments: [
            { userId: "user1", text: "Amazing experience!" },
            { userId: "user2", text: "Beautiful location." },
        ],
        unavailableDates: [
            { startDate: "2023-02-01", endDate: "2023-02-10" },
        ],
        additionalFeatures: [
            { name: "Scuba Diving Experience", pricePerNight: 10 },
            { name: "Private Chef", pricePerNight: 20 },
        ],
    };

    return (
        <>
            <Container maxW="5xl" p={{ base: 4, sm: 10 }} >
                <Box w="100%" p={4} color="white">
                    <ImageDisplay slides={roomDetails.images} />
                </Box>
            </Container>
        </>
    )
}