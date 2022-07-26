import styled from '@emotion/styled';
import { Box, Container, Grid as BaseGrid, GridItem } from '@chakra-ui/react';

import BottomNavigation from '../BottomNavigation';

import { COMMON_BOTTOM_NAVIGATION_HEIGHT } from 'constants/_common';

const Grid = styled(BaseGrid)`
  height: 100vh;

  /* iOS only */
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      height: -webkit-fill-available;
    }
  }
`;

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <Box backgroundColor="gray.100">
    <Container maxWidth="container.md" padding="0">
      <Grid templateRows={`auto ${COMMON_BOTTOM_NAVIGATION_HEIGHT}px`}>
        <GridItem overflow="auto">
          <Box height="100%">{children}</Box>
        </GridItem>
        <GridItem>
          <BottomNavigation />
        </GridItem>
      </Grid>
    </Container>
  </Box>
);

export default Layout;
