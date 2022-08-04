import BottomNavigation from '../BottomNavigation';

import { Box, Container } from '@chakra-ui/react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <Box backgroundColor="gray.100">
    <Container maxWidth="container.md" height="100%" padding="0">
      <main>{children}</main>
    </Container>
    <BottomNavigation />
  </Box>
);

export default Layout;
