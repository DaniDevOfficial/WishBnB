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
import { Admin } from "./Admin";
import { User } from "firebase/auth";
import { Checkout } from "./Checkout";
import { AllRooms } from "./AllRooms";
import { Payment } from "./Payment";
import { Profile } from "./Profile";
import { AboutUs } from "./AboutUs";
import PrivacyPolicy from "./PrivacyPolicy";



export function Routing() {
    const { toggleColorMode, colorMode } = useColorMode();
    const [hasAllowedRoleCreator, setHasAllowedRoleCreator] = useState(false);
    const [hasAllowedRoleAdmin, setHasAllowedRoleAdmin] = useState(false);
    const [roomToEdit, setRoomToEdit] = useState(null);
    const [user, setUser] = useState<User | null>(null);
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
            setUser(user);
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
                        <Route path="/Creator" element={<HomePage rooms={rooms} />} />
                    )}
                    {hasAllowedRoleCreator ? (
                        <Route path="/Creator/Upload/NewRoom" element={<CreateNewRoom edit={false} rooms={rooms} />} />
                    ) : (
                        <Route path="/Creator/Upload/NewRoom" element={<Navigate to="/" />} />
                    )}
                    {hasAllowedRoleCreator ? (
                        <Route path="/Creator/update/:id" element={<CreateNewRoom edit={true} rooms={rooms} />} />
                    ) : (
                        <Route path="/Creator/update/:id" element={<Navigate to="/" />} />
                    )}
                    {hasAllowedRoleAdmin ? (
                        <Route path="/Admin" element={<Admin />} />
                    ) : (
                        <Route path="/Admin" element={<Navigate to="/" />} />
                    )}
                    {user ? (
                        <Route path="/profile" element={<Profile />} />
                    ) : (
                        <Route path="/profile" element={<Navigate to="/" />} />
                    )}
                    {user ? (
                        <Route path="/room/checkout/:id" element={<Checkout rooms={rooms} />} />
                    ) : (
                        <Route path="/room/checkout/:id" element={<Navigate to="/" />} />
                    )}
                    {user ? (
                        <Route path="/room/payment/:id" element={<Payment />} />
                    ) : (
                        <Route path="/room/payment/:id" element={<Navigate to="/" />} />
                    )}
                    <Route path="rooms" element={<AllRooms rooms={rooms} />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
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
