import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { SpreadSheets } from 'domains/spreadsheets/spreadsheets.type';
import * as Mapper from 'domains/spreadsheets/spreadsheets.mapper';

import AutoResizeTextarea from 'components/feedback/components/AutoResizeTextarea';

import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { AiOutlineMail } from 'react-icons/ai';

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
          <Icon as={AiOutlineMail} width={{ base: '120px', sm: '160px' }} height={{ base: '120px', sm: '160px' }} color="purple.400" />
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
