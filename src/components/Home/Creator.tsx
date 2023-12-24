import {
  chakra,
  Box,
  Stack,
  Link,
  HStack,
  Text,
  Container,
  Icon,
  Avatar,
  Tooltip,
  Divider,
  useColorModeValue,
  Heading,
  useColorMode
} from '@chakra-ui/react';
import { AiFillGithub } from 'react-icons/ai';

const UserCard = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Heading as="h3" size="lg" mb="1" color={useColorModeValue("text.base", "text.darkmode")} display={"block"}>
        Our Team
      </Heading>
      <Container maxW="5xl" p={{ base: 5, md: 6 }}>
        <Stack
          w="17rem"
          spacing={2}
          p={4}
          border="1px solid"
          borderColor={useColorModeValue('gray.400', 'gray.600')}
          rounded="md"
          margin="0 auto"
          _hover={{
            boxShadow: useColorModeValue(
              '0 4px 6px rgba(160, 174, 192, 0.6)',
              '0 4px 6px rgba(9, 17, 28, 0.4)'
            )
          }}
        >
          <HStack justifyContent="space-between" alignItems="baseline">
            <Tooltip
              label="Winterthur, Swiss"
              aria-label="Winterthur, Swiss"
              placement="right-end"
              size="sm"
            >
              <Box pos="relative">
                <Avatar
                  src="https://avatars.githubusercontent.com/u/79514091?v=4"
                  name="David Bischof"
                  size="xl"
                  borderRadius="md"

                />
                <Avatar
                  src="https://flagcdn.com/ch.svg"
                  name="Swiss Flag"
                  size="xs"
                  borderRadius="full"
                  pos="absolute"
                  bottom={0}
                  right="-12px"
                />
              </Box>
            </Tooltip>
            <Link isExternal href="https://github.com/DaniDevOfficial">
              <Icon as={AiFillGithub} w={6} h={6} />
            </Link>
          </HStack>
          <chakra.h1 fontSize="xl" fontWeight="bold">
            David Bischof
          </chakra.h1>
          <Text fontSize="md" color="gray.500">
            Software Engineer, Student at the KBW
          </Text>
          <Divider />
          <Text fontSize="md" color="gray.500">
            I am the Creator and CEO of WishBnB. I am willing to help you with any problems you might have.
          </Text>
        </Stack>
      </Container>
    </>
  );
};

export default UserCard;