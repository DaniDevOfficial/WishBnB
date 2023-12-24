
import { ChakraProvider } from "@chakra-ui/react";
import { Routing } from "./pages/Routing";
import { theme } from './config/chakra';

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routing />
    </ChakraProvider>
  );
}
