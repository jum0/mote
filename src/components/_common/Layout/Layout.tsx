import { Box, Container, GridItem } from '@chakra-ui/react';

import BottomNavigation from '../BottomNavigation';

import { COMMON_BOTTOM_NAVIGATION_HEIGHT } from 'constants/_common';

import * as Styled from './Layout.styled';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <Box backgroundColor="gray.100">
    <Container maxWidth="container.md" padding="0">
      <Styled.Grid templateRows={`auto ${COMMON_BOTTOM_NAVIGATION_HEIGHT}px`}>
        <GridItem overflow="auto">
          <Box height="100%">{children}</Box>
        </GridItem>
        <GridItem>
          <BottomNavigation />
        </GridItem>
      </Styled.Grid>
    </Container>
  </Box>
);

export default Layout;
