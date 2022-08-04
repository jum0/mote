import ActiveLinkIcon from '../ActiveLinkIcon';

import { Flex } from '@chakra-ui/react';
import { AiFillCalculator, AiFillEdit } from 'react-icons/ai';

const BottomNavigation = () => (
  <Flex
    flexDirection="row"
    position="fixed"
    justifyContent="space-around"
    alignItems="center"
    bottom="0"
    left="50%"
    transform="translate(-50%, 0)"
    width="100%"
    height="56px"
    maxWidth="container.md"
    backgroundColor="white"
    borderTopLeftRadius="20px"
    borderTopRightRadius="20px"
    border="1px"
    borderColor="gray.200"
  >
    <ActiveLinkIcon href={'/calculation'} icon={AiFillCalculator} text={'계산'} />
    <ActiveLinkIcon href={'/feedback'} icon={AiFillEdit} text={'의견'} />
  </Flex>
);

export default BottomNavigation;
