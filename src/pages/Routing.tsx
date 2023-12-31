import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./HomePage";
import {
    IconButton, useColorMode

} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa"
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SingleRoom } from "./SingleRoom";
import { useEffect, useState } from "react";
import { getAllDataInRoute } from "../repo/repo";



export function Routing() {
    const { toggleColorMode, colorMode } = useColorMode();
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

return (
    <>
        <Navbar rooms={rooms}/>
        <Routes>
            <Route path="/" element={<HomePage rooms={rooms}/>} />
            <Route path="/room/:id" element={<SingleRoom rooms={rooms}/>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes >
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

)

}
