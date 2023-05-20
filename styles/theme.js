import { extendTheme } from "@chakra-ui/react";
import { statTheme } from '../components/statTheme'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
      },
    },
  },
  components: { Stat: statTheme }
});

export default theme;
