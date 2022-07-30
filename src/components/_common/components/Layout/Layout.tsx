import BottomNavigation from 'components/BottomNavigation';

import { Box, Container } from '@chakra-ui/react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <Box backgroundColor="blackAlpha.50">
    <Container maxWidth="container.md" height="100vh" padding={0}>
      <main>{children}</main>
      <BottomNavigation />
    </Container>
  </Box>
);

export default Layout;
