import {
    Button,
    Flex,
    IconButton,
    useColorMode

} from "@chakra-ui/react"; import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FaMoon, FaSun } from "react-icons/fa";
import { Room } from "../types/Room";

export function PageLayout({ rooms }: { rooms: Room[] }) {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <Flex justify={"center"} width={"100%"} bg="black" minHeight="100vh" flexDirection="column">

            <Navbar rooms={rooms} />
            <Outlet />
            <Footer />
            <IconButton
                aria-label="toggle theme"
                rounded="full"
                size="xs"
                position="fixed"
                bottom={4}
                left={4}
                onClick={toggleColorMode}
                icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
            />
        </Flex>
    );
}
