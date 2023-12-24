import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import { HomePage } from "./HomePage";
import {
    IconButton, useColorMode

} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa"
 

const router = createHashRouter([

    {
        index: true,
        element: <HomePage />,
    },
    {
        path: "*",
        element: <Navigate to="/" />,
    },

]);

export function Routing() {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <>
            
            <RouterProvider router={router} />
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
