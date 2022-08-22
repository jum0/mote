import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

import type { StockInput } from 'domains/stock/stock.type';
import * as Cal from 'domains/stock/stock.calculation';

import { COMMON_BORDER_RADIUS } from 'constants/_common';

type StockTableProps = {
  stockInfo: StockInput;
};

const StockTable = (props: StockTableProps) => {
  const { stockInfo } = props;

  const data = Cal.result(stockInfo);

  if (!stockInfo.stockPrice) {
    return (
      <Flex height="100%" justifyContent="center" alignItems="center" backgroundColor="white" borderRadius={`${COMMON_BORDER_RADIUS}px`}>
        <Text fontSize="md" color="gray.500">
          가격을 입력해 주세요
        </Text>
      </Flex>
    );
  }

  if (stockInfo.stockPrice !== 0 && !stockInfo.shares) {
    return (
      <Table colorScheme="gray" size="sm" variant="simple" backgroundColor="white" borderRadius="20px" width="100%">
        <Thead>
          <Tr height="40px">
            <Th textAlign="center" whiteSpace="nowrap" paddingX="12px">
              등락률 (%)
            </Th>
            <Th textAlign="center" whiteSpace="nowrap">
              가격 ($)
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.priceIndex}>
              <Td textAlign="center">{Number((100 * row.priceIndex).toFixed(1))}</Td>
              <Td textAlign="center">{row.stockPrice}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }

  if (stockInfo.stockPrice !== 0 && stockInfo.shares !== 0) {
    return (
      <Table colorScheme="gray" size="sm" variant="simple" backgroundColor="white" borderRadius="20px" width="100%">
        <Thead>
          <Tr height="40px">
            <Th textAlign="center" whiteSpace="nowrap" paddingX="12px">
              등락률 (%)
            </Th>
            <Th whiteSpace="nowrap" isNumeric>
              가격 ($)
            </Th>
            <Th whiteSpace="nowrap" isNumeric>
              순수익 ($)
            </Th>
            <Th whiteSpace="nowrap" isNumeric>
              수수료 ($)
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.priceIndex}>
              <Td textAlign="center">{Number((100 * row.priceIndex).toFixed(1))}</Td>
              <Td isNumeric>{row.stockPrice}</Td>
              <Td isNumeric>{row.profit}</Td>
              <Td isNumeric>{row.commission}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }
};

export default StockTable;
