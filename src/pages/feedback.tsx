import AutoResizeTextarea from 'components/feedback/AutoResizeTextarea';

import { Box, Button, Flex, Text } from '@chakra-ui/react';

const Feedback = () => (
  <Flex height="100vh" flexDirection="column" backgroundColor="white" padding="16px 24px 0 24px" rowGap="4px">
    <Box>
      <Text fontSize="2xl" fontWeight="extrabold">
        원하는 기능을 알려주세요.
      </Text>
      <Text fontSize="md" fontWeight="light">
        가장 의견이 많은 기능부터 만들어볼게요.
      </Text>
      <AutoResizeTextarea placeholder="예) 원화로 계산하고 싶어요." margin="16px 0 16px" />
    </Box>
    <Button>의견 제출하기</Button>
  </Flex>
);

export default Feedback;
