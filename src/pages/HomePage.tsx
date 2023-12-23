import React from 'react'
import Landing from '../components/Home/Landing'
import { Stats } from '../components/Home/Stats'
import { TopHits } from '../components/Home/TopHits'
import { Container } from '@chakra-ui/react'

export function HomePage() {

    return (
        <>
            <Container maxW="5xl" p={{ base: 4, sm: 10 }} >
                <Landing />
                <TopHits />
                <Stats />
            </Container>
        </>
    )
}