import type { AppProps } from 'next/app';

import Layout from 'components/_common/components/Layout';
import theme from '../theme';

import { ChakraProvider } from '@chakra-ui/react';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
);

export default MyApp;
