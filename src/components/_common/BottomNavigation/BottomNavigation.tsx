import ActiveLinkIcon from '../ActiveLinkIcon';

import { Flex } from '@chakra-ui/react';
import { AiFillCalculator, AiFillEdit } from 'react-icons/ai';

import { COMMON_BORDER_RADIUS } from 'constants/_common';

const BottomNavigation = () => (
  <Flex
    height="100%"
    backgroundColor="white"
    borderTopLeftRadius={`${COMMON_BORDER_RADIUS}px`}
    borderTopRightRadius={`${COMMON_BORDER_RADIUS}px`}
    border="1px"
    borderColor="gray.200"
  >
    <ActiveLinkIcon href={'/calculation'} icon={AiFillCalculator} text={'계산'} />
    <ActiveLinkIcon href={'/feedback'} icon={AiFillEdit} text={'의견'} />
  </Flex>
);

export default BottomNavigation;
