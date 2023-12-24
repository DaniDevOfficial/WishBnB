import { extendTheme } from "@chakra-ui/react";
import { Tokens } from "../../.mirrorful/theme";

const colors = {
  ...Tokens.colors,
};



export const theme = extendTheme({
  colors,

});
