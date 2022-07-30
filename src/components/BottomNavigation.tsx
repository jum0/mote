// TODO: 수정 예정

import { Container } from './_common/components/Container';

import { Link as ChakraLink, Button } from '@chakra-ui/react';

const BottomNavigation = () => (
  <Container flexDirection="row" position="fixed" bottom={0} width="100%" maxWidth="container.md" py={3}>
    <Button as={ChakraLink} href="/" variant="outline" colorScheme="green" rounded="button" flexGrow={1} mx={2} width="full">
      chakra-ui
    </Button>
    <Button as={ChakraLink} href="/feedback" variant="solid" colorScheme="green" rounded="button" flexGrow={3} mx={2} width="full">
      View Repo
    </Button>
  </Container>
);

export default BottomNavigation;
