import { SingleLocationContainer } from '../SingleLocationContainer'
import { Flex, WrapItem } from '@chakra-ui/react'

export function TopHits() {

    const topHits = [
        {
            id: "1",
            title: "The Pillow Fort Haven",
            image: "",
            location: "Cozy Corner, location1",
            description: "Escape to the fluffiest haven on earth. Perfect for pillow fights and bedtime stories. A 5-star experience guaranteed!",
            price: "50"
        },
        {
            id: "2",
            title: "The Bubble Wrap Bungalow",
            image: "https://www.gannett-cdn.com/authoring/2010/11/15/NTPC/ghows-CO-c1d58d9d-95f4-4cc9-b0ce-82a742d88627-223af73c.jpeg?crop=759,430,x0,y0&width=2560",
            location: "Pop-a-Lot Lane, location2",
            description: "Indulge in the therapeutic joy of endless bubble popping. A sanctuary for those who seek the ultimate stress relief!",
            price: "40"
        },
        {
            id: "3",
            title: "The Underwater Treehouse",
            image: "https://www.gannett-cdn.com/authoring/2010/11/15/NTPC/ghows-CO-c1d58d9d-95f4-4cc9-b0ce-82a742d88627-223af73c.jpeg?crop=759,430,x0,y0&width=2560",
            location: "Aqua Arboretum, location3",
            description: "Dive into the world's first underwater treehouse. Explore the oceanic wonders and sleep surrounded by fishy neighbors!",
            price: "30"
        },
        
    ];



    return (
        <Flex
            flexWrap={"wrap"}
            gap={4}            
            justifyContent="center"
            my={10}
        >
                {topHits.map((post, index) => (
                    <WrapItem key={index} >
                        <SingleLocationContainer post={post} />
                    </WrapItem>
                ))}
        </Flex>
    )
}