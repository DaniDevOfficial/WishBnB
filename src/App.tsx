
import { ChakraProvider } from "@chakra-ui/react";
import { Routing } from "./pages/Routing";

export function App() {
  return (
    <ChakraProvider >
      <Routing />
    </ChakraProvider>
  );
}
