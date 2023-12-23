import React from 'react'
import { SingleLocationContainer } from '../SingleLocationContainer'
import { Flex, Wrap, WrapItem } from '@chakra-ui/react'

export function TopHits() {

    // create a json with 3 top hits
    // each has a title, image, location, and description   and price
    const topHits = [
        {
            title: "title1",
            image: "https://www.gannett-cdn.com/authoring/2010/11/15/NTPC/ghows-CO-c1d58d9d-95f4-4cc9-b0ce-82a742d88627-223af73c.jpeg?crop=759,430,x0,y0&width=2560",
            location: "location1",
            description: "description1",
            price: "5"
        },
        {
            title: "title2",
            image: "https://www.gannett-cdn.com/authoring/2010/11/15/NTPC/ghows-CO-c1d58d9d-95f4-4cc9-b0ce-82a742d88627-223af73c.jpeg?crop=759,430,x0,y0&width=2560",
            location: "location2",
            description: "description2",
            price: "4"
        },
        {
            title: "title3",
            image: "https://www.gannett-cdn.com/authoring/2010/11/15/NTPC/ghows-CO-c1d58d9d-95f4-4cc9-b0ce-82a742d88627-223af73c.jpeg?crop=759,430,x0,y0&width=2560",
            location: "location3",
            description: "description3",
            price: "3"
        },
    ]
    return (
        <Flex
            align="center"
            direction="column"
            my={10}
        >
            <Wrap spacing="4">
                {topHits.map((post, index) => (
                    <WrapItem key={index} >
                        <SingleLocationContainer post={post} />
                    </WrapItem>
                ))}
            </Wrap>
        </Flex>
    )
}