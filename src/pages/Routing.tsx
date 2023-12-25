import { BrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import {
    IconButton, useColorMode

} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa"
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";



export function Routing() {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <>
            <Navbar />
            <BrowserRouter>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes >
            </BrowserRouter >
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

            <Footer />

        </>

    )

}
