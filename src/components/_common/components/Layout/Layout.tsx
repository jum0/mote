import BottomNavigation from '../BottomNavigation';

import { Box, Container } from '@chakra-ui/react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <Box backgroundColor="blackAlpha.50">
    <Container maxWidth="container.md" height="100%" padding="16px 16px 68px 16px">
      <main>{children}</main>
    </Container>
    <BottomNavigation />
  </Box>
);

export default Layout;
