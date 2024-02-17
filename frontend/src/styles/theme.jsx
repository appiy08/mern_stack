import {extendTheme} from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: () => ({
      "html, body": {
        background: "gray.100",
      },
    }),
  },
});

export default theme;
