import UserCard from '../components/Home/Creator'
import Landing from '../components/Home/Landing'
import { Stats } from '../components/Home/Stats'
import { TopHits } from '../components/Home/TopHits'
import { Container } from '@chakra-ui/react'
import { Room } from '../types/Room'
export function HomePage({ rooms }: { rooms: Room[] }) {
    console.log(rooms)
    return (
        <>
            <Container maxW="5xl" p={{ base: 4, sm: 10 }} >
                <Landing />
                <TopHits rooms={rooms}/>
                <Stats />
                <UserCard />
            </Container>
        </>
    )
}