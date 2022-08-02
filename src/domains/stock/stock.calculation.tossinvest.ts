import type { StockInfo } from './stock.type';

/*

해외 주식 수수료
- 해외 주식 거래 수수료율은 거래금액의 0.1% (2023년 6월까지)
  - 판매금액의 0.00229%(SEC Fee), 판매수량 당 0.000119 달러(TAF, 최소 0.01 달러, 최대 5.95달러)가 유관기관 수수료로 별도 부과

https://tossinvest.com/faq?tab=1&page=1

------------------------------------------
- 토스 증권 해외 주식 수수료 = 수수료 + 제세금
  - 수수료 = 매수 거래 금액 수수료 + 매도 거래 금액 수수료 
  - 제세금 = SEC(The Securities and Exchange Commission) Fee + TAF(Trading Activity Fee)

- 거래 수수료를 계산할 때는 $0.01 미만은 절사한다.
- SEC Fee를 계산할 때는 $0.01 미만은 반올림한다.
*/

export const calculateCommission = (stockPriceList: Array<StockInfo>, stockPrice: number, shares: number) =>
  stockPriceList.map((stockInfo) => {
    // 계산 과정
    // 전체 수수료 = 매매 수수료(매수 거래 금액 수수료 + 매도 거래 금액 수수료) + 제세금(SEC Fee + TAF)

    // 매수 거래 금액
    const buyingTradeValue = Number((stockPrice * shares).toFixed(2));
    // 매수 거래 대금의 수수료
    const buyingTradeCommission = Math.floor(buyingTradeValue * 0.1 * 0.01 * 100) / 100;

    // 매도 거래 금액
    const sellingTradeValue = Number((stockInfo.stockPrice * shares).toFixed(2));
    // 매도 거래 대금의 수수료
    const sellingTradeCommission = Math.floor(sellingTradeValue * 0.1 * 0.01 * 100) / 100;
    // 총 매매 수수료
    const totalTradeCommission = Number((buyingTradeCommission + sellingTradeCommission).toFixed(2));

    // SEC Fee
    const secFee = Number((sellingTradeValue * 0.00229 * 0.01).toFixed(2));
    // TA Fee
    const taFee = shares * 0.000119 > 0.01 ? (shares * 0.000119 > 5.95 ? 5.95 : Number((shares * 0.000119).toFixed(2))) : 0.01;
    // 총 제세금
    const totalFee = Number((secFee + taFee).toFixed(2));

    // 최종 수수료 (매매 수수료 + 제세금)
    const totalCommission = Number((totalTradeCommission + totalFee).toFixed(2));

    return {
      ...stockInfo,
      commission: totalCommission,
    };
  });
