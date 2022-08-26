import styled from '@emotion/styled';
import { Flex, Table, Tbody, Td as BaseTd, Text, Th as BaseTh, Thead, Tr } from '@chakra-ui/react';

import type { StockInput } from 'domains/stock/stock.type';
import * as Cal from 'domains/stock/stock.calculation';

import { COMMON_BORDER_RADIUS } from 'constants/_common';

const Th = styled(BaseTh)`
  padding-left: 2px;
  padding-right: 2px;
`;

const Td = styled(BaseTd)`
  padding-left: 2px;
  padding-right: 2px;
`;

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
              등락률(%)
            </Th>
            <Th textAlign="center" whiteSpace="nowrap">
              가격
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
            <BaseTh whiteSpace="nowrap" textAlign="center" width="10%" padding="4px 2px 4px 12px">
              등락률(%)
            </BaseTh>
            <Th whiteSpace="nowrap" isNumeric>
              매입단가
            </Th>
            <Th whiteSpace="nowrap" isNumeric>
              매입금액
            </Th>
            <Th whiteSpace="nowrap" isNumeric>
              순수익
            </Th>
            <BaseTh whiteSpace="nowrap" isNumeric padding="4px 12px 4px 2px">
              수수료
            </BaseTh>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.priceIndex}>
              <BaseTd textAlign="center" padding="8px 2px 8px 12px">
                {Number((100 * row.priceIndex).toFixed(1))}
              </BaseTd>
              <Td isNumeric>{row.stockPrice}</Td>
              <Td isNumeric>{row.purchaseAmount}</Td>
              <Td isNumeric>{row.profit}</Td>
              <BaseTd isNumeric padding="8px 12px 8px 2px">
                {row.commission}
              </BaseTd>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }
};

export default StockTable;
