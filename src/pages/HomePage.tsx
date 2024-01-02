import UserCard from '../components/Home/Creator'
import Landing from '../components/Home/Landing'
import { Stats } from '../components/Home/Stats'
import { TopHits } from '../components/Home/TopHits'
import { Container } from '@chakra-ui/react'
import { Room } from '../types/Room'
export function HomePage({ rooms }: { rooms: Room[] }) {
    return (
        <>
                <Landing />
                <TopHits rooms={rooms}/>
                <Stats />
                <UserCard />
        </>
    )
}