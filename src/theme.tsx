import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const theme = extendTheme(
  {
    colors: {
      // purple과 동일
      brand: {
        100: '#E9D8FD',
        600: '#6B46C1',
      },
    },
    components: {
      Input: {
        defaultProps: {
          focusBorderColor: 'brand.600',
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'purple',
  }),
);

export default theme;
