import { Room } from '../../types/Room';
import { SingleLocationContainer } from '../SingleLocationContainer'
import { Flex, WrapItem } from '@chakra-ui/react'

export function TopHits({ rooms }: { rooms: Room[] }) {

    const topHits = rooms.slice(0, 3);



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