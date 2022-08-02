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
  Input,
  InputGroup,
  InputLeftElement,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react';

type StockInputBarProps = {
  setStockInfo: (stockInfo: SetStateAction<StockInput>) => void;
};

const StockInputBar = (props: StockInputBarProps) => {
  const { setStockInfo } = props;

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
    <Box backgroundColor="white">
      <Flex>
        <Flex columnGap="2">
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
              $
            </InputLeftElement>
            <Input name="stockPrice" placeholder="가격" type="number" width="120px" onChange={handlePriceSharesChange} />
          </InputGroup>
          <InputGroup>
            <Input variant="outline" name="shares" placeholder="수량" type="number" width="120px" onChange={handlePriceSharesChange} />
          </InputGroup>
        </Flex>

        <RangeSlider
          // eslint-disable-next-line jsx-a11y/aria-proptypes
          aria-label={['min', 'max']}
          defaultValue={[SLIDER_INITIAL_MIN_VALUE, SLIDER_INITIAL_MAX_VALUE]}
          min={SLIDER_MIN_VALUE}
          max={SLIDER_MAX_VALUE}
          step={SLIDER_STEP}
          onChangeEnd={handleRangeChange}
        >
          <RangeSliderTrack backgroundColor="brand.100">
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </Flex>
    </Box>
  );
};
export default StockInputBar;
