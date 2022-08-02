import { Fragment } from 'react';

import type { StockInput } from 'domains/stock/stock.type';
import * as Cal from 'domains/stock/stock.calculation';

import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

type StockTableProps = {
  stockInfo: StockInput;
};

// TODO: 계산 fallback UI 등 세분화하기
const StockTable = (props: StockTableProps) => {
  const { stockInfo } = props;

  const data = Cal.result(stockInfo);

  return (
    <Fragment>
      <Table size={'sm'} variant="simple">
        <Thead>
          <Tr>
            <Th textAlign="center">등락률 (%)</Th>
            <Th isNumeric>가격 ($)</Th>
            <Th isNumeric>순수익 ($)</Th>
            <Th isNumeric>수수료 ($)</Th>
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
    </Fragment>
  );
};

export default StockTable;
