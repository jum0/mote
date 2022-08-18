import React from 'react';

import ResizeTextarea from 'react-textarea-autosize';

import { Textarea, TextareaProps } from '@chakra-ui/react';

// eslint-disable-next-line react/display-name
const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => (
  <Textarea
    ref={ref}
    as={ResizeTextarea}
    borderRadius="10px"
    minHeight="unset"
    overflow="hidden"
    width="100%"
    resize="none"
    minRows="2"
    backgroundColor="gray.50"
    border="1px"
    borderColor="gray.50"
    _hover={{ border: '1px', borderColor: 'gray.200', backgroundColor: 'gray.200' }}
    _focus={{ boxShadow: 'none', border: '1px', borderColor: 'gray.200', backgroundColor: 'gray.200' }}
    {...props}
  />
));

export default AutoResizeTextarea;
