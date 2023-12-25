import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Icon,
  IconButton,
  useDisclosure,
  useColorModeValue,
  InputGroup,
  VStack,
  Highlight,
  Input,
  InputLeftElement,
  Divider,
  Modal,
  ModalContent,
  ModalOverlay,
  ButtonGroup,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { GiCapybara } from "react-icons/gi";
import { useEffect, useState } from 'react';
import Sound from '../Stuff/Sound.mp3';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';
import { Search2Icon } from '@chakra-ui/icons';
import { set } from 'firebase/database';
const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Rooms', path: '/rooms' },
];

const dropdownLinks = [
  {
    name: 'Contact',
    path: '/contact'
  },
  {
    name: 'Documentation',
    path: '#'
  },
  {
    name: 'Github Repo',
    path: '#'
  }
];

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts([
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
    ]);
  }
    , []);
  const {
    isOpen: isSearchOpen,
    onClose: onSearchClose,
    onOpen: onSearchOpen,
  } = useDisclosure({ defaultIsOpen: false });
  useEffect(() => {
    if (!searchInput) {
      setFilteredPosts([]);
      return;
    }

    const search = searchInput.toLowerCase();

    const filtered = posts.filter((post) => {
      const title = post.title.toLowerCase();

      return title.includes(search);
    });

    setFilteredPosts(filtered);
  }, [searchInput]);

  function handleSearch(id: string) {
    alert(`/post/${id}`);
    onSearchBarClose();
  }
  function onSearchBarClose() {
    setSearchInput("");
    onSearchClose();
  }


  const [counter, setCounter] = useState(0);
  const [audio] = useState(new Audio(Sound));
  if (counter === 20) {
    audio.play(); // is kinda loud. Pay attention
    setCounter(0);
  }
  return (
    <Box px={4} bg={useColorModeValue('white', 'gray.800')}>
      <Modal size={"lg"} isOpen={isSearchOpen} onClose={onSearchBarClose}>
        <ModalOverlay />
        <ModalContent padding={2}>
          <VStack gap={3}>
            <InputGroup>
              <InputLeftElement>
                <Search2Icon color={"bg-highlight"} />
              </InputLeftElement>
              <Input
                color={"black"}
                fontWeight={"medium"}
                borderColor="transparent"
                focusBorderColor="transparent"
                _hover={{ borderColor: "transparent" }}
                placeholder="Suche einen Post"
                autoFocus
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </InputGroup>
            {filteredPosts.length > 0 && (
              <>
                <Divider />
                <VStack gap={2} width={"100%"}>
                  {filteredPosts.map((post, i) => (
                    <Button
                      key={i}
                      onClick={() => handleSearch(post.id)}
                      paddingY={6}
                      width={"100%"}
                      colorScheme="gray"
                    >
                      <Text
                        textOverflow={"ellipsis"}
                        overflow={"hidden"}
                        width={"100%"}
                        color={"black"}
                        textAlign={"left"}
                      >
                        <Highlight
                          styles={{ bg: "accent.base" }}
                          query={searchInput}
                        >
                          {post.title}
                        </Highlight>
                      </Text>
                    </Button>
                  ))}
                </VStack>
              </>
            )}
          </VStack>
        </ModalContent>
      </Modal>
      <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
        <Icon as={GiCapybara} h={8} w={8} onClick={() => setCounter(counter + 1)} cursor={"pointer"} />

        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={6} display={{ base: 'none', md: 'flex' }} alignItems="center">
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}

            {/* Dropdown Menu */}
            <Menu autoSelect={false} isLazy>
              {({ isOpen, onClose }) => (
                <>
                  <MenuButton _hover={{ color: 'blue.400' }}>
                    <Flex alignItems="center">
                      <Text>Community</Text>
                      <Icon
                        as={BiChevronDown}
                        h={5}
                        w={5}
                        ml={1}
                        transition="all .25s ease-in-out"
                        transform={isOpen ? 'rotate(180deg)' : ''}
                      />
                    </Flex>
                  </MenuButton>
                  <MenuList
                    zIndex={5}
                    bg={useColorModeValue('rgb(255, 255, 255)', 'rgb(26, 32, 44)')}
                    border="none"
                    boxShadow={useColorModeValue(
                      '2px 4px 6px 2px rgba(160, 174, 192, 0.6)',
                      '2px 4px 6px 2px rgba(9, 17, 28, 0.6)'
                    )}
                  >
                    {dropdownLinks.map((link, index) => (
                      <MenuLink key={index} name={link.name} path={link.path} onClose={onClose} />
                    ))}
                  </MenuList>
                </>
              )}
            </Menu>
          </HStack>
        </HStack>

        <IconButton
          size="md"
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          display={{ base: 'inherit', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <ButtonGroup>
          <IconButton
            aria-label="Suche"
            icon={<Search2Icon />}
            variant={"ghost"}
            color={useColorModeValue('primary.base', 'primary.darkmode')}
            _hover={{ bg: "transparent", transform: "scale(1.2)" }}
            onClick={onSearchOpen}
          />
          <Button
            bgColor={useColorModeValue('primary.base', 'primary.darkmode')}
            color={'white'}
            size="md"
            rounded="md"
            display={'block'}>

            Sign in
          </Button>
        </ButtonGroup>
      </Flex>

      {/* Mobile Screen Links */}
      {isOpen ? (
        <Box pb={4} display={{ base: 'inherit', md: 'none' }}>
          <Stack as="nav" spacing={2}>
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
            <Text fontWeight="semibold" color="gray.500">
              Community
            </Text>
            <Stack pl={2} spacing={1} mt={'0 !important'}>
              {dropdownLinks.map((link, index) => (
                <NavLink key={index} {...link} onClose={onClose} />
              ))}
            </Stack>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

// NavLink Component
interface NavLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const NavLink = ({ name, path, onClose }: NavLinkProps) => {
  return (
    <Link
      href={path}
      lineHeight="inherit"
      _hover={{
        textDecoration: 'none',
        color: useColorModeValue('blue.500', 'blue.200')
      }}
      onClick={() => onClose()}
    >
      {name}
    </Link>
  );
};

interface MenuLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const MenuLink = ({ name, path, onClose }: MenuLinkProps) => {
  return (
    <Link href={path} onClick={() => onClose()}>
      <MenuItem _hover={{ color: 'blue.400', bg: useColorModeValue('gray.200', 'gray.700') }}>
        <Text>{name}</Text>
      </MenuItem>
    </Link>
  );
};