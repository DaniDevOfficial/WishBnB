import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./HomePage";
import {
    Button,
    Container,
    IconButton, useColorMode

} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa"
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SingleRoom } from "./SingleRoom";
import { useEffect, useState } from "react";
import { getAllDataInRoute, getUserRoles } from "../repo/repo";
import { YourRooms } from "./YourRooms";
import { auth } from "../config/firebase";
import { CreateNewOffer } from "./CreateNewOffer";
import { CreateNewRoom } from "./CreateNewRoom";



export function Routing() {
    const { toggleColorMode, colorMode } = useColorMode();
    const [hasAllowedRoleCreator, setHasAllowedRoleCreator] = useState(false);
    const [hasAllowedRoleAdmin, setHasAllowedRoleAdmin] = useState(false);
    const allowedRolesCreator = ["creator", "admin"];
    const allowedRolesAdmin = ["admin"];
    const pathname = useLocation();
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllDataInRoute("/rooms");
                setRooms(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            const userId = user?.uid;
            if (!userId) return (
                setHasAllowedRoleCreator(false),
                setHasAllowedRoleAdmin(false)
            );

            getUserRoles(userId)
                .then((userRoles) => {
                    if (!userRoles) return;
                    const hasAllowedRoleAdmin = checkRoles(userRoles, allowedRolesAdmin);
                    const hasAllowedRoleCreator = checkRoles(userRoles, allowedRolesCreator);
                    setHasAllowedRoleCreator(hasAllowedRoleCreator);
                    setHasAllowedRoleAdmin(hasAllowedRoleAdmin);
                    console.log(hasAllowedRoleCreator);
                    console.log(hasAllowedRoleAdmin);
                })
                .catch((error) => {
                    console.error(error);
                });
        });

        return () => unsubscribe();
    }, [auth]);

    function checkRoles(userRoles: string[], allowedRoles: string[]): boolean {
        return userRoles.some((role) => allowedRoles.includes(role));
    }

    return (
        <>
            <Navbar rooms={rooms} />
            <Container maxW="5xl" p={{ base: 4, sm: 10 }} >
                <Routes>
                    <Route path="/" element={<HomePage rooms={rooms} />} />
                    <Route path="/room/:id" element={<SingleRoom rooms={rooms} />} />
                    {hasAllowedRoleCreator ? (
                        <Route path="/Creator" element={<YourRooms rooms={rooms} />} />
                    ) : (
                        <Route path="/Creator" element={<YourRooms rooms={rooms} />} />
                    )}
                    <Route path="/Creator/Upload/NewRoom" element={<CreateNewRoom selectedRoom={null} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Container>
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
        </>
    );

}
