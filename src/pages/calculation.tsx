import { useState } from 'react';

import type { StockInput } from 'domains/stock/stock.type';

import StockInputBar from 'components/calculation/components/StockInputBar';
import {
  SLIDER_INITIAL_MAX_VALUE,
  SLIDER_INITIAL_MIN_VALUE,
  SLIDER_STEP,
} from 'components/calculation/components/StockInputBar/StockInputBar.constant';
import StockTable from 'components/calculation/components/StockTable';

import { Box, Flex } from '@chakra-ui/react';

const Calculation = () => {
  const [stockInfo, setStockInfo] = useState<StockInput>({
    stockPrice: 0,
    shares: 0,
    priceIndex: {
      minMax: [SLIDER_INITIAL_MIN_VALUE, SLIDER_INITIAL_MAX_VALUE],
      interval: SLIDER_STEP,
    },
  });

  return (
    <Box padding="16px 16px 68px 16px">
      <Flex flexDirection="column" rowGap="12px">
        <StockInputBar minMax={stockInfo.priceIndex.minMax} setStockInfo={setStockInfo} />
        <StockTable stockInfo={stockInfo} />
      </Flex>
    </Box>
  );
};

export default Calculation;
