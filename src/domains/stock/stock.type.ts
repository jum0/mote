export type StockInput = {
  stockPrice: number;
  shares: number;
  priceIndex: {
    minMax: Array<number>;
    interval: number;
  };
};

export type StockInfo = {
  priceIndex: number;
  stockPrice: number;
  purchaseAmount: number;
  profit: number;
  commission: number;
};
