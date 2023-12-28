import { BrowserRouter, Navigate, Route, Routes, useLocation  } from "react-router-dom";
import { HomePage } from "./HomePage";
import {
    IconButton, useColorMode

} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa"
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SingleRoom } from "./SingleRoom";
import { useEffect } from "react";



export function Routing() {
    const { toggleColorMode, colorMode } = useColorMode();
    const  pathname  = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return (
        <>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/room/:id" element={<SingleRoom />} />
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
