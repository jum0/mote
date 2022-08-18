// 파일 위치 보류

import type { StockInput, StockInfo } from './stock.type';
import * as TossInvest from './stock.calculation.tossinvest';

const getPriceIndexList = (maximum: number, minimum: number, interval: number): Array<StockInfo> =>
  Array.from({ length: (maximum - minimum) / interval + 1 }, (_, i) => ({
    priceIndex: Number((maximum / 100 - (interval * i) / 100).toFixed(3)),
    stockPrice: 0,
    profit: 0,
    commission: 0,
  }));

const getStockPriceList = (priceIndexList: Array<StockInfo>, stockPrice: number): Array<StockInfo> =>
  priceIndexList.map((info) => ({
    ...info,
    // 매도할 금액을 추산하기 위한 것이기 때문에 올림으로 계산
    stockPrice: Math.ceil((info.priceIndex + 1) * stockPrice * 100) / 100,
  }));

const getProfitCommissionList = (stockPriceList: Array<StockInfo>, stockPrice: number, shares: number): Array<StockInfo> => {
  const commissionList = TossInvest.calculateCommission(stockPriceList, stockPrice, shares);
  const profitCommissionList = commissionList.map((stockInfo) => {
    // 계산 과정
    // 순수익 = 매도 금액 - 매수 금액 - 수수료

    // 총 매도 금액
    const sellingTradeValue = Number((stockInfo.stockPrice * shares).toFixed(2));
    // 총 매수 금액
    const buyingTradeValue = Number((stockPrice * shares).toFixed(2));
    // 수수료
    const commission = stockInfo.commission;

    // 순수익
    const profit = Number((sellingTradeValue - buyingTradeValue - commission).toFixed(2));

    return {
      ...stockInfo,
      profit: profit,
    };
  });

  return profitCommissionList;
};

export const result = (data: StockInput): Array<StockInfo> => {
  // 가격 지수별 list 생성
  const priceIndexList = getPriceIndexList(data.priceIndex.minMax[1], data.priceIndex.minMax[0], data.priceIndex.interval);

  // 지수별 가격 리스트 생성
  const stockPriceList = getStockPriceList(priceIndexList, data.stockPrice);

  // 지수별 수익(profit)과 수수료(commission) 리스트 생성
  const profitCommissionList = getProfitCommissionList(stockPriceList, data.stockPrice, data.shares);

  return profitCommissionList;
};
