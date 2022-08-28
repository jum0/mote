import { useCallback, useState } from 'react';

import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { AiOutlineMail } from 'react-icons/ai';

import type { SpreadSheets } from 'domains/spreadsheets/spreadsheets.type';
import * as Mapper from 'domains/spreadsheets/spreadsheets.mapper';

import AutoResizeTextarea from 'components/feedback/AutoResizeTextarea';

const Feedback = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isDirty },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      content: '',
    },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetForm = useCallback(() => {
    reset({ content: '' });
  }, [reset]);

  const onSubmit = async (data: SpreadSheets) => {
    const submitStartTime = performance.now();

    setIsSubmitted(true);

    const response = await fetch('/api/spreadsheets', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Mapper.trimContent(data)),
    });

    if (response.status === 201) {
      resetForm();

      const submitEndTime = performance.now();
      console.log('submit time', submitEndTime - submitStartTime);
    }
  };

  const handleConfirmButtonClick = useCallback(() => {
    setIsSubmitted(false);
  }, []);

  if (isSubmitted) {
    return (
      <Flex height="100%" flexDirection="column" backgroundColor="white" padding="16px 24px 60px 24px" justifyContent="space-between">
        <Box>
          <Text fontSize="2xl" fontWeight="extrabold">
            의견 제출을 잘 끝냈어요.
          </Text>
          <Text fontSize="2xl" fontWeight="extrabold">
            소중한 의견 감사해요.
          </Text>
        </Box>
        <Box display="flex" justifyContent="center">
          <AnimatedIcon
            as={AiOutlineMail}
            width={{ base: '120px', sm: '200px' }}
            height={{ base: '120px', sm: '200px' }}
            color="purple.400"
          />
        </Box>
        <Box>
          <Button width="100%" onClick={handleConfirmButtonClick}>
            확인
          </Button>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex height="100%" flexDirection="column" backgroundColor="white" padding="16px 24px 0 24px" rowGap="4px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Text fontSize="2xl" fontWeight="extrabold">
            원하는 기능을 알려주세요.
          </Text>
          <Text fontSize="md" fontWeight="light">
            가장 의견이 많은 기능부터 만들어볼게요.
          </Text>
          <AutoResizeTextarea {...register('content')} placeholder="예) 원화로 계산하고 싶어요." margin="16px 0 16px" />
        </Box>
        <Button type="submit" width="100%" disabled={!isDirty}>
          의견 제출하기
        </Button>
      </form>
    </Flex>
  );
};

export default Feedback;

const AnimatedIcon = styled(Icon)`
  -webkit-animation: wobble-hor-bottom 1.6s both;
  animation: wobble-hor-bottom 1.6s both;
  animation-iteration-count: infinite;

  @-webkit-keyframes wobble-hor-bottom {
    0%,
    67% {
      -webkit-transform: translateX(0%);
      transform: translateX(0%);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
    10% {
      -webkit-transform: translateX(-30px) rotate(-6deg);
      transform: translateX(-30px) rotate(-6deg);
    }
    20% {
      -webkit-transform: translateX(15px) rotate(6deg);
      transform: translateX(15px) rotate(6deg);
    }
    30% {
      -webkit-transform: translateX(-15px) rotate(-3.6deg);
      transform: translateX(-15px) rotate(-3.6deg);
    }
    45% {
      -webkit-transform: translateX(9px) rotate(2.4deg);
      transform: translateX(9px) rotate(2.4deg);
    }
    50% {
      -webkit-transform: translateX(-6px) rotate(-1.2deg);
      transform: translateX(-6px) rotate(-1.2deg);
    }
  }
  @keyframes wobble-hor-bottom {
    0%,
    67% {
      -webkit-transform: translateX(0%);
      transform: translateX(0%);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
    10% {
      -webkit-transform: translateX(-30px) rotate(-6deg);
      transform: translateX(-30px) rotate(-6deg);
    }
    20% {
      -webkit-transform: translateX(15px) rotate(6deg);
      transform: translateX(15px) rotate(6deg);
    }
    30% {
      -webkit-transform: translateX(-15px) rotate(-3.6deg);
      transform: translateX(-15px) rotate(-3.6deg);
    }
    40% {
      -webkit-transform: translateX(9px) rotate(2.4deg);
      transform: translateX(9px) rotate(2.4deg);
    }
    50% {
      -webkit-transform: translateX(-6px) rotate(-1.2deg);
      transform: translateX(-6px) rotate(-1.2deg);
    }
  }
`;
