import * as React from 'react';
import { Container, Text, SimpleGrid, Box, chakra, Stack, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { AiFillCheckCircle } from 'react-icons/ai';

interface StatData {
  label: string;
  score: string;
}

const statData: StatData[] = [
  {
    label: 'Weekly Rentings',
    score: '500+'
  },
  {
    label: 'Active Monthly Users',
    score: '1000+'
  },
  {
    label: 'Total Accounts',
    score: '30k+'
  },
  {
    label: 'Rating on TrustPilot',
    score: '4.9/5'
  }
];

const planList = [
  'Transparency. Most of our work is public.',
  'Freedom. We are available all around the world.',
  'Safety. Each of our locations is reviewed in person.',
  'Pricing. We try to find you the best deals you could get.'
];

export const Stats = () => {
  return (
      <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between" my={10}>
        <Stack spacing={4}>
          <chakra.h1 fontSize="2xl" lineHeight={1.2} fontWeight="bold">
            Our ultimate goal
          </chakra.h1>
          <Text fontSize="md"  color={useColorModeValue("smalltext.base", "smalltext.base")} maxW="480px">
            We want to make sure that everyone can find a place to stay during their holydays in, no matter how much money they have.
            WishBnB lets you find the best deals for your stay, and we are always here to help you.
          </Text>

          <Stack spacing={2}>
            <Text fontSize="md" color={useColorModeValue("text.base", "text.darkmode")}>
              We plan on doing all that cultivating our values:
            </Text>
            {planList.map((data, index) => (
              <HStack key={index} alignItems="center" spacing={1} fontSize="md">
                <Icon as={AiFillCheckCircle} w={4} h={4} color={useColorModeValue("secondary.base", "secondary.darkmode")} />
                <Text fontSize="md">{data}</Text>
              </HStack>
            ))}
          </Stack>
        </Stack>
        <Stack>
          <SimpleGrid columns={2} spacing={5} pt={8} pl={{ base: 0, md: 10 }} margin="auto 0">
            {statData.map((data, index) => (
              <Stack
                key={index}
                pl={3}
                py={1}
                pr={1}
                borderLeft="2px solid"
                borderLeftColor={useColorModeValue("accent.base", "accent.darkmode")}
                justifyContent="space-between"
              >
                <Box fontSize="2xl" fontWeight="bold" color={useColorModeValue("secondary.base", "secondary.darkmode")}>
                  {data.score}
                </Box>
                <Text fontSize="md">{data.label}</Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
  );
};

