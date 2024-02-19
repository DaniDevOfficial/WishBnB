import {
  chakra,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  Image,
  Skeleton,
  Box,
  Link,
  Icon,
  useColorMode
} from '@chakra-ui/react';
import { GoChevronRight } from 'react-icons/go';
import { MdHouse } from 'react-icons/md';
import LogoImage from './LogoImage.png'
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate(); 

  return (
    <Stack direction={{ base: 'column', md: 'row' }} justifyContent="center" my={10}>
      <Stack direction="column" spacing={6} justifyContent="center" maxW="480px">
        <HStack
          as={Link}
          p={1}
          rounded="full"
          fontSize="sm"
          w="max-content"
          bg={useColorModeValue('gray.200', 'gray.700')}
        >
          <Box
            py={1}
            px={2}
            lineHeight={1}
            rounded="full"
            color="black"
            bgColor={useColorModeValue('secondary.base', 'secondary.darkmode')}
          >
            What's new
          </Box>
          <HStack spacing={1} alignItems="center" justifyContent="center">
            <Text lineHeight={1}>See our recent updates</Text>
            <Icon as={GoChevronRight} w={4} h={4} />
          </HStack>
        </HStack>
        <chakra.h1 fontSize="5xl" lineHeight={1} fontWeight="bold" textAlign="left">
          Your Basements and Boxes <br />
          <chakra.span color={colorMode === 'dark' ? 'accent.darkmode' : 'accent.base'}>
            With WishBnB
          </chakra.span>
        </chakra.h1>
        <Text
          fontSize="1.2rem"
          textAlign="left"
          lineHeight="1.375"
          fontWeight="400"
          color="smalltext.base"
        >
          At WishBnB, we offer uniquely charming stays in basements and boxes, creating memorable experiences for the bold traveler (or sweatshop owner).

        </Text>
        <HStack
          spacing={{ base: 0, sm: 2 }}
          mb={{ base: '3rem !important', sm: 0 }}
          flexWrap="wrap"
        >
          <chakra.button
            w={{ base: '100%', sm: 'auto' }}
            h={12}
            px={6}
            color={colorMode === 'dark' ? "text.darkmode" : "text.base"} rounded="md"
            mb={{ base: 2, sm: 0 }}
            zIndex={5}
            lineHeight={1}
            bgColor={useColorModeValue('primary.base', 'primary.darkmode')}
            _hover={{ opacity: 0.9, transform: 'scale(1.05)', transition: 'transform 0.3s ease-in-out' }}
            transition="transform 0.3s ease-in-out"
            onClick={() => navigate('/rooms')}
          >
            <chakra.span color={"white"}> Explore all our Places now </chakra.span>
            <Icon color="white"as={MdHouse} h={4} w={4} ml={1} />
          </chakra.button>
          <Box
            display="flex"
            justifyContent="center"
            bg={useColorModeValue('white', 'gray.800')}
            w={{ base: '100%', sm: 'auto' }}
            border="1px solid"
            borderColor="gray.300"
            p={3}
            lineHeight={1.18}
            rounded="md"
            boxShadow="md"
            as={Link}
            zIndex={5}
          >
            sum ting
          </Box>
        </HStack>
      </Stack>
      <Box ml={{ base: 0, md: 5 }} pos="relative">
        <DottedBox />
        <Image
          w="100%"
          h="100%"
          minW={{ base: 'auto', md: '30rem' }}
          objectFit="cover"
          src={LogoImage}
          rounded="md"
        
        fallback={<Skeleton w="" h="100px" minHeight={{ base: '25rem', md: '25rem' }} minW={{ base: 'auto', md: '30rem' }}/>}
        />
      </Box>
    </Stack>
  );
};

function DottedBox() {
  return (
    <Box position="absolute" left="-45px" top="-30px" height="full" maxW="700px" zIndex={-1}>
      <svg
        color={useColorModeValue('rgba(55,65,81, 0.1)', 'rgba(55,65,81, 0.7)')}
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"></rect>
      </svg>
    </Box>
  );
}

export default HeroSection;