import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import type { SpreadSheets } from 'domains/spreadsheets/spreadsheets.type';
import * as Mapper from 'domains/spreadsheets/spreadsheets.mapper';

import AutoResizeTextarea from 'components/feedback/AutoResizeTextarea';

import { Box, Button, Flex, Text } from '@chakra-ui/react';

const Feedback = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isDirty },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      createdAt: '',
      content: '',
    },
  });

  const resetForm = useCallback(() => {
    reset({ content: '', createdAt: '' });
  }, [reset]);

  const onSubmit = async (data: SpreadSheets) => {
    const response = await fetch('/api/spreadsheets', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Mapper.addCreatedAt_trimmedContent(data)),
    });

    if (response.status === 201) {
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex height="100vh" flexDirection="column" backgroundColor="white" padding="16px 24px 0 24px" rowGap="4px">
        <Box>
          <Text fontSize="2xl" fontWeight="extrabold">
            원하는 기능을 알려주세요.
          </Text>
          <Text fontSize="md" fontWeight="light">
            가장 의견이 많은 기능부터 만들어볼게요.
          </Text>
          <AutoResizeTextarea {...register('content')} placeholder="예) 원화로 계산하고 싶어요." margin="16px 0 16px" />
        </Box>
        <Button type="submit" disabled={!isDirty}>
          의견 제출하기
        </Button>
      </Flex>
    </form>
  );
};

export default Feedback;
