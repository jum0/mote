import styled from '@emotion/styled';
import { Grid as BaseGrid } from '@chakra-ui/react';

export const Grid = styled(BaseGrid)`
  height: 100vh;

  /* iOS only */
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      height: -webkit-fill-available;
    }
  }
`;
