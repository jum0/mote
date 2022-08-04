import Link from 'next/link';
import { useRouter } from 'next/router';

import { Flex, Icon, Text } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

type ActiveLinkIconProps = {
  href: string;
  icon: IconType;
  text: string;
};

const ActiveLinkIcon = (props: ActiveLinkIconProps) => {
  const { href, icon, text } = props;

  const router = useRouter();

  const activeColor = router.asPath === href ? 'black' : 'gray.400';

  return (
    <Link href={href}>
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        cursor="pointer"
        color={activeColor}
      >
        <Icon as={icon} width="24px" height="24px" />
        <Text fontSize="xs">{text}</Text>
      </Flex>
    </Link>
  );
};

export default ActiveLinkIcon;
