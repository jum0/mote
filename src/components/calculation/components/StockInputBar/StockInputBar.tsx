import type { ChangeEvent, SetStateAction } from 'react';

import {
  SLIDER_INITIAL_MAX_VALUE,
  SLIDER_INITIAL_MIN_VALUE,
  SLIDER_MAX_VALUE,
  SLIDER_MIN_VALUE,
  SLIDER_STEP,
} from './StockInputBar.constant';

import type { StockInput } from 'domains/stock/stock.type';

import {
  Box,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from '@chakra-ui/react';

import { COMMON_BORDER_RADIUS } from 'components/_common/constants/styles';

type StockInputBarProps = {
  minMax: Array<number>;
  setStockInfo: (stockInfo: SetStateAction<StockInput>) => void;
};

const StockInputBar = (props: StockInputBarProps) => {
  const { minMax, setStockInfo } = props;

  const handlePriceSharesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.valueAsNumber;

    setStockInfo((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleRangeChange = (minMax: Array<number>) => {
    if (!Array.isArray(minMax)) {
      return;
    }

    setStockInfo((prevState) => ({
      ...prevState,
      priceIndex: {
        ...prevState.priceIndex,
        minMax,
      },
    }));
  };

  return (
    <Flex
      backgroundColor="white"
      borderRadius={`${COMMON_BORDER_RADIUS}`}
      justifyContent="center"
      alignItems="center"
      padding={{ base: '16px 16px 8px 16px', sm: '16px' }}
    >
      <Grid templateColumns={{ base: '', sm: '1fr 1fr' }} autoRows="1fr" columnGap="20px" rowGap="8px">
        {/* Input */}
        <Flex columnGap="8px">
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
              $
            </InputLeftElement>
            <Input name="stockPrice" placeholder="가격" type="number" onChange={handlePriceSharesChange} />
          </InputGroup>
          <InputGroup>
            <Input variant="outline" name="shares" placeholder="수량" type="number" onChange={handlePriceSharesChange} />
          </InputGroup>
        </Flex>

        {/* Range Slider */}
        <Flex alignItems="center">
          <Flex justifyContent="center" alignItems="center" minWidth="60px">
            <Text fontSize="md">{minMax[0]}</Text>
            <Text fontSize="xs" padding="4.5px 0 0 1px">
              %
            </Text>
          </Flex>
          <Box width="100%" paddingTop="4px">
            <RangeSlider
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-label={['min', 'max']}
              defaultValue={[SLIDER_INITIAL_MIN_VALUE, SLIDER_INITIAL_MAX_VALUE]}
              min={SLIDER_MIN_VALUE}
              max={SLIDER_MAX_VALUE}
              step={SLIDER_STEP}
              onChange={handleRangeChange}
            >
              <RangeSliderTrack backgroundColor="brand.100">
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </Box>
          <Flex justifyContent="center" alignItems="center" minWidth="60px">
            <Text fontSize="md">{minMax[1]}</Text>
            <Text fontSize="xs" padding="4.5px 0 0 1px">
              %
            </Text>
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
};
export default StockInputBar;
