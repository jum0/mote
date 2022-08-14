import BottomNavigation from '../BottomNavigation';

import { Box, Container, Grid as BaseGrid, GridItem } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { COMMON_BOTTOM_NAVIGATION_HEIGHT } from 'components/_common/constants/styles';

type LayoutProps = {
  children: React.ReactNode;
};

const Grid = styled(BaseGrid)`
  height: 100vh;

  /* iOS only */
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      height: -webkit-fill-available;
    }
  }
`;

const Layout = ({ children }: LayoutProps) => (
  <Box backgroundColor="gray.100">
    <Container maxWidth="container.md" padding="0">
      <Grid templateRows={`auto ${COMMON_BOTTOM_NAVIGATION_HEIGHT}px`}>
        <GridItem overflow="auto">
          <Box height={`calc(100vh - ${COMMON_BOTTOM_NAVIGATION_HEIGHT}px)`}>{children}</Box>
        </GridItem>
        <GridItem>
          <BottomNavigation />
        </GridItem>
      </Grid>
    </Container>
  </Box>
);

export default Layout;
